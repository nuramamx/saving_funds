class CheckAndAssign {
  static checkNumber(input: string): Number {
    return !isNaN(Number(input)) ? Number(input) : 0;
  }

  static checkText(input: string): string {
    const regex = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
    return regex.test(input) ? input : '';
  }
}

export default CheckAndAssign;