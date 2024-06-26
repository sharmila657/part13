const { Model, DataTypes } = require('sequelize')

const {sequelize} = require('../util/db')
 
  class Blog extends Model {}
  Blog.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT
    },
    title: {
      type: DataTypes.TEXT
    },
    likes: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
  })

module.exports = {Blog}