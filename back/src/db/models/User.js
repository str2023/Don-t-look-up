const UserModel = require('../schemas/user');

const create = async ({ newUser }) => {
  const createdNewUser = await UserModel.create(newUser);
  return createdNewUser;
};

const findByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const findById = async ({ userId }) => {
  const user = await UserModel.findOne({ id: userId });
  return user;
};

const findAll = async () => {
  const users = await UserModel.find({});
  return users;
};

const update = async ({ userId, fieldToUpdate, newValue }) => {
  const filter = { id: userId };
  const updateData = { [fieldToUpdate]: newValue };
  const option = { returnOriginal: false };

  const updatedUser = await UserModel.findOneAndUpdate(
    filter,
    updateData,
    option,
  );
  return updatedUser;
};

const remove = async ({ userId }) => {
  const withdrawalUser = await UserModel.findOneAndDelete({ id: userId });
  return withdrawalUser;
};

module.exports = { create, findByEmail, findById, findAll, update, remove };
