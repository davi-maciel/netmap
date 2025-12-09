import { supabase } from './supabase'
import { uploadProfilePicture } from './storage'

// Get all people with their locations
export async function getPeopleWithLocations() {
    try {
        const { data: people, error: peopleError } = await supabase
            .from('people')
            .select('*')
            .order('first_name')

        if (peopleError) throw peopleError

        const peopleIds = people.map(p => p.id)

        if (peopleIds.length === 0) {
            return people.map(p => ({ ...p, locations: [] }))
        }

        const { data: locations, error: locationsError } = await supabase
            .from('locations')
            .select('*')
            .in('person_id', peopleIds)

        if (locationsError) throw locationsError

        return people.map(person => ({
            ...person,
            locations: locations.filter(loc => loc.person_id === person.id)
        }))
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Get single person by ID
export async function getPersonById(personId) {
    try {
        const { data: person, error: personError } = await supabase
            .from('people')
            .select('*')
            .eq('id', personId)
            .single()

        if (personError) throw personError

        const { data: locations, error: locationsError } = await supabase
            .from('locations')
            .select('*')
            .eq('person_id', personId)

        if (locationsError) throw locationsError

        return { ...person, locations }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Add new person
export async function addPerson({ firstName, lastName, bio, locations, profilePicture }) {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        // Insert person
        const { data: person, error: personError } = await supabase
            .from('people')
            .insert({
                user_id: user.id,
                first_name: firstName,
                last_name: lastName,
                bio,
                profile_picture_url: null
            })
            .select()
            .single()

        if (personError) throw personError

        // Upload profile picture if provided
        if (profilePicture) {
            const { url } = await uploadProfilePicture(person.id, profilePicture)
            if (url) {
                // Update person with picture URL
                await supabase
                    .from('people')
                    .update({ profile_picture_url: url })
                    .eq('id', person.id)

                person.profile_picture_url = url
            }
        }

        // Insert locations
        if (locations && locations.length > 0) {
            const locationsToInsert = locations.map(loc => ({
                person_id: person.id,
                label: loc.label,
                latitude: loc.latitude,
                longitude: loc.longitude,
                connection: loc.connection
            }))

            const { data: insertedLocations, error: locationsError } = await supabase
                .from('locations')
                .insert(locationsToInsert)
                .select()

            if (locationsError) throw locationsError

            return { ...person, locations: insertedLocations }
        }

        return { ...person, locations: [] }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Update person
export async function updatePerson(personId, { firstName, lastName, bio, locations, profilePicture }) {
    try {
        // Upload new profile picture if provided
        let profilePictureUrl = undefined
        if (profilePicture) {
            const { url } = await uploadProfilePicture(personId, profilePicture)
            if (url) {
                profilePictureUrl = url
            }
        }

        // Update person
        const updateData = {
            first_name: firstName,
            last_name: lastName,
            bio
        }

        if (profilePictureUrl) {
            updateData.profile_picture_url = profilePictureUrl
        }

        const { data: person, error: personError } = await supabase
            .from('people')
            .update(updateData)
            .eq('id', personId)
            .select()
            .single()

        if (personError) throw personError

        // Delete old locations
        await supabase
            .from('locations')
            .delete()
            .eq('person_id', personId)

        // Insert new locations
        if (locations && locations.length > 0) {
            const locationsToInsert = locations.map(loc => ({
                person_id: personId,
                label: loc.label,
                latitude: loc.latitude,
                longitude: loc.longitude,
                connection: loc.connection
            }))

            const { data: insertedLocations, error: locationsError } = await supabase
                .from('locations')
                .insert(locationsToInsert)
                .select()

            if (locationsError) throw locationsError

            return { ...person, locations: insertedLocations }
        }

        return { ...person, locations: [] }
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Delete person
export async function deletePerson(personId) {
    try {
        const { error } = await supabase
            .from('people')
            .delete()
            .eq('id', personId)

        if (error) throw error
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Get locations with people (for map)
export async function getLocationsWithPeople() {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        const { data: locations, error: locationsError } = await supabase
            .from('locations')
            .select(`
                *,
                person:people(*)
            `)

        if (locationsError) throw locationsError

        return locations
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}