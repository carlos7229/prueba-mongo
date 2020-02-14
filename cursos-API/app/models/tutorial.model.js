module.exports = mongoose => {
    const Tutorial = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          titulo: String,
          descripcion: String,
          publicado: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Tutorial;
  };