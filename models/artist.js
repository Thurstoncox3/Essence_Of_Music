const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Artist extends Model {}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artist_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
  },
    genre_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'genre',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "artist",
  }
);

module.exports = Artist;