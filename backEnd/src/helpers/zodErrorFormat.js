const zodErrorFormat = (error) => {
  if (!error) {
      throw new Error('Error object is undefined');
  }

  const errorFormatted = error.format();
  delete errorFormatted._errors
  for (let field in errorFormatted) {
    errorFormatted[field] = { messages: errorFormatted[field]._errors }
  }
  return errorFormatted
}

export default zodErrorFormat