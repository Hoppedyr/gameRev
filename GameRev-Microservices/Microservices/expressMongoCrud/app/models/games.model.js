module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        published: Boolean,
        test: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Game = mongoose.model("game", schema);
    return Game;
  };
  