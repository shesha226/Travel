import User from '../models/user.js';

class UserRepository {
    async create(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async findById(userId) {
        try {
            return await User.findById(userId).select('-password');
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async findByNIC(nic) {
        try {
            return await User.findOne({ nic });
        } catch (error) {
            throw new Error(`Error finding user by NIC: ${error.message}`);
        }
    }

    async findByContactNumber(contactNumber) {
        try {
            return await User.findOne({ contact_number: contactNumber });
        } catch (error) {
            throw new Error(`Error finding user by contact number: ${error.message}`);
        }
    }

    async findAll(page = 1, limit = 10, filters = {}) {
        try {
            const skip = (page - 1) * limit;
            const query = {};

            if (filters.name) {
                query.name = { $regex: filters.name, $options: 'i' };
            }

            if (filters.email) {
                query.email = { $regex: filters.email, $options: 'i' };
            }

            const users = await User.find(query)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const total = await User.countDocuments(query);

            return {
                users,
                total,
                page,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            throw new Error(`Error finding users: ${error.message}`);
        }
    }

    async update(userId, updateData) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async delete(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    async updatePassword(userId, newPassword) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                { password: newPassword },
                { new: true, runValidators: true }
            ).select('-password');
        } catch (error) {
            throw new Error(`Error updating password: ${error.message}`);
        }
    }

    async checkUserExists(email, nic, contactNumber) {
        try {
            return await User.findOne({
                $or: [
                    { email },
                    { nic },
                    { contact_number: contactNumber }
                ]
            });
        } catch (error) {
            throw new Error(`Error checking user existence: ${error.message}`);
        }
    }
}

export default new UserRepository();