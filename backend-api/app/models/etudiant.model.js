module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nom: String,
      prenom: String,
      filiere: String,
      annee: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Etudiant = mongoose.model("etudiant", schema);
  return Etudiant;
};
