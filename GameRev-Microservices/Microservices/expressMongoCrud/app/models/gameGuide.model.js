module.exports = mongoose => {
  var schema = mongoose.Schema({
    guideName: String,
    gameName: String,
    description: String,
    published: Boolean
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const GameGuide = mongoose.model("gameGuide", schema);
  return GameGuide;
};