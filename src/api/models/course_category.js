import { Model } from "sequelize";

/**
 * @typedef CourseCategoryAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Course_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      // define association here
    }
  }
  Course_category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Course_category",
      tableName: "Course_categories",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_category;
};
