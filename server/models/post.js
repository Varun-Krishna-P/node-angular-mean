'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING(5000)
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};