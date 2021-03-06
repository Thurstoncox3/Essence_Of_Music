const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Song extends Model {};

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    song_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
    album_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'album',
            key: 'id'
        }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'genre',
          key: 'id'
      }
  },
    lyrics: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: false
    },
    audio: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "song",
  }
);

module.exports = Song;
