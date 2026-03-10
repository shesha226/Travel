import experienceService from "../service/experianceService.js";
import { createExperienceDTO, updateExperienceDTO } from "../dtos/experianceDTO.js";
export const createExperience = async (req, res) => {
    try {
        const { error, value } = createExperienceDTO.validate(req.body);

        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message
            });
            return;
        }

        const { title, description, location, price, image_url } = value;
        const userId = req.user.userId;

        const result = await experienceService.createExperience({ title, description, location, price, image_url, userId });

        res.status(201).json({
            success: true,
            message: 'Experience created successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllExperiences = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await experienceService.getAllExperiences(page, limit);

        res.status(200).json({
            success: true,
            data: result.experiences,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getExperienceById = async (req, res) => {
    try {
        const experience = await experienceService.getExperienceById(req.params.id);

        if (!experience) {
            res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getExperienceByTitle = async (req, res) => {
    try {
        const experience = await experienceService.getExperienceByTitle(req.params.title);

        if (!experience) {
            res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updatedExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = updateExperienceDTO.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message
            });
            return;
        }

        const updateData = value;

        const experience = await experienceService.updatedExperience(id, updateData);

        if (!experience) {
            res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await experienceService.deleteExperience(id);

        if (!experience) {
            res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
