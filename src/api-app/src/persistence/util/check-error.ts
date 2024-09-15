const ParseError = (err: any): Error => {
  if (err.parent !== null && err.parent !== undefined
    && err.parent.where !== null && err.parent.where !== undefined)
    return new Error(`[E-201]: ${err.parent.where}`);
  else if (err.message !== null && err.message !== undefined)
    return new Error(`[E-202]: ${err.message}`);
  else
    return new Error(`[E-200]: ${err}`);
};

export default ParseError;