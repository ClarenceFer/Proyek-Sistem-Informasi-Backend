module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("files", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mimetype: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    filecategory: {
      type: Sequelize.STRING, // questions, answers, testCases
      allowNull: false
    },
    question_set_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "question_sets",
        key: "id"
      }
    },
    data: {
      type: Sequelize.BLOB("long"), // isi file
      allowNull: false
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  // Scope
  File.addScope("active", { where: { is_deleted: false } });
  File.addScope("deleted", { where: { is_deleted: true } });
  File.addScope("withDeleted", {});

  File.associate = function(models) {
    File.belongsTo(models.QuestionSet, {
      foreignKey: "question_set_id",
      as: "questionSet"
    });
  };

  File.prototype.softDelete = function() {
    return this.update({ is_deleted: true, deleted_at: new Date() });
  };

  File.prototype.restore = function() {
    return this.update({ is_deleted: false, deleted_at: null });
  };

  File.findActive = function(options = {}) {
    return this.scope("active").findAll(options);
  };

  File.findDeleted = function(options = {}) {
    return this.scope("deleted").findAll(options);
  };

  File.findWithDeleted = function(options = {}) {
    return this.scope("withDeleted").findAll(options);
  };

  return File;
};
