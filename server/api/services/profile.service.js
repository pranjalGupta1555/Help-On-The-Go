import Profile from '../models/Profile.js';

// upload image 
export const uploadUserImage = async (req) => {
    const newProfile = await new Profile({
        profId: req.params.id,
        image: req.file.buffer
    });

    const data = newProfile.save();

    return data;
}

// retrieve an image using the id
export const getUserImage = async (id) => {
    const data = await Profile.findOne({ profId: id }).exec();
    return data;
}