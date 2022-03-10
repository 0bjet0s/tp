'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Director,{
        as: 'director',
        foreignKey : 'directorId'
      })

      Movie.belongsToMany(models.Actor,{
        as : 'movies',
        foreignKey : 'movieId',
        otherKey : 'actorId',
        through : 'Actor_has_Movies'
      })

      Movie.belongsToMany(models.User,{
        as : 'users',
        foreignKey : 'userId',
        otherKey : 'movieId',
        through : 'Favorite'
      })

      Movie.belongsToMany(models.Genre,{
        as : 'genres',
        foreignKey : 'movieId',
        otherKey : 'genreId',
        through : 'movie_has_Genres'
      })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    directorId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    price : DataTypes.INTEGER,
    image: DataTypes.STRING,
    trailer: DataTypes.STRING,
    length: DataTypes.INTEGER,
    sinopsis: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies'
  });
  return Movie;
};