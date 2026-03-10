import ExperienceRepository from "../repositories/experienceRepository.js";

class experienceService {
    async createExperience(experienceData) {
        const { title, description, location, price, image_url, userId } = experienceData;

        const existingExperience = await ExperienceRepository.findExperienceByTitle(title);
        if (existingExperience) {
            throw new Error("Experience with this title already exists");
        }

        const experience = await ExperienceRepository.createExperience({ title, description, location, price, image_url, user: userId });
        return {
            message: "Experience created successfully",
            experience
        };
    }

    async getAllExperiences(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const { experiences, totalDocuments } = await ExperienceRepository.findAllExperiences(skip, limit);

        const totalPages = Math.ceil(totalDocuments / limit);

        return {
            experiences,
            pagination: {
                totalDocuments,
                totalPages,
                currentPage: page,
                limit
            }
        };
    }

    async getExperienceById(experienceId) {
        const experience = await ExperienceRepository.findExperienceById(experienceId);
        return experience;
    }

    async getExperienceByTitle(title) {
        const experience = await ExperienceRepository.findExperienceByTitle(title);

        if (!experience) {
            throw new Error("Experience not found");
        }
        return {
            message: "Experience found successfully",
            experience
        };
    }

    async updatedExperience(experienceId, updateData) {
        const experience = await ExperienceRepository.findExperienceById(experienceId);

        if (!experience) {
            throw new Error("Experience not found");
        }

        const updatedFields = {
            title: updateData.title || experience.title,
            description: updateData.description || experience.description,
            location: updateData.location || experience.location,
            price: updateData.price !== undefined ? updateData.price : experience.price,
            image_url: updateData.image_url || experience.image_url,
        }

        const updatedExperience = await ExperienceRepository.updateExperience(experienceId, updatedFields);

        return {
            message: "Experience updated successfully",
            updatedExperience
        };

    }

    async deleteExperience(experienceId) {
        const experience = await ExperienceRepository.deleteExperience(experienceId);

        if (!experience) {
            throw new Error("Experience not found");
        }
        return {
            message: "Experience deleted successfully",
            experience
        };
    }

}

export default new experienceService();
