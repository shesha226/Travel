import Experience from "../models/experience.js";

class ExperienceRepository {
    async createExperience(experienceData) {
        try {
            const newExperience = new Experience(experienceData);
            return await newExperience.save();
        } catch (error) {
            throw new Error(`Error creating experience: ${error.message}`);
        }
    }

    async findAllExperiences(skip = 0, limit = 10) {
        try {
            const experiences = await Experience.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('user', 'name');

            const totalDocuments = await Experience.countDocuments();
            return { experiences, totalDocuments };
        } catch (error) {
            throw new Error(`Error finding experiences: ${error.message}`);
        }
    }

    async findExperienceById(experienceId) {
        try {
            return await Experience.findById(experienceId).populate('user', 'name');
        } catch (error) {
            throw new Error(`Error finding experience by ID: ${error.message}`);
        }
    }

    async findExperienceByTitle(title) {
        try {
            return await Experience.findOne({ title }).populate('user', 'name');
        } catch (error) {
            throw new Error(`Error finding experience by title: ${error.message}`);
        }
    }

    async updateExperience(experienceId, updateData) {
        try {
            return await Experience.findByIdAndUpdate(
                experienceId,
                updateData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error updating experience: ${error.message}`);
        }
    }

    async deleteExperience(experienceId) {
        try {
            return await Experience.findByIdAndDelete(experienceId);
        } catch (error) {
            throw new Error(`Error deleting experience: ${error.message}`);
        }
    }
}

export default new ExperienceRepository();
