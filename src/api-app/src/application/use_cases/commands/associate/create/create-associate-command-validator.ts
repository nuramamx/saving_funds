import v8n from "v8n";
import CreateAssociateCommand from "./create-associate-command-handler";
import CommandValidation from "../../../../interfaces/command-validation";
import CommandValidator from "../../../../interfaces/command-validator";
import BeneficiaryInfo from "../../../../../domain/interfaces/beneficiary-info";

export default class CreateAssociateCommandValidator implements CommandValidator<CreateAssociateCommand> {
  readonly notPassed: CommandValidation[] = [];
  readonly baseValidation = v8n().not.undefined().not.null().not.empty();

  constructor(readonly command: CreateAssociateCommand) {}

  validate(): CommandValidation[] {
    this.validateAssociate();
    this.validateAddress();
    this.validateWorkplace();
    this.validateBeneficiaries();

    return this.notPassed;
  }

  validateAssociate(): void {
    if (!this.baseValidation.string().test(this.command.rfc))
      this.notPassed.push({ message: 'Se requiere de R.F.C.' });

    if (!this.baseValidation.string().minLength(5).maxLength(25).test(this.command.name.firstname))
      this.notPassed.push({ message: 'Se requiere del primer nombre.' });

    if (!this.baseValidation.string().minLength(5).maxLength(25).test(this.command.name.paternal_lastname))
      this.notPassed.push({ message: 'Se requiere del apellido parterno.' });

    if (!this.baseValidation.string().minLength(5).maxLength(25).test(this.command.name.maternal_lastname))
      this.notPassed.push({ message: 'Se requiere del apellido materno.' });

    if (!this.baseValidation.string().includes('M' || 'F').test(this.command.gender))
      this.notPassed.push({ message: 'Se requiere del sexo.' });

    if (!this.baseValidation.string().test(this.command.detail.dependency_key))
      this.notPassed.push({ message: 'Se requiere de la clave de dependencia.' });

    if (!this.baseValidation.string().test(this.command.detail.agreement))
      this.notPassed.push({ message: 'Se requiere del convenio.' });

    if (!this.baseValidation.string().test(this.command.detail.category))
      this.notPassed.push({ message: 'Se requiere de la categoría.' });

    if (!this.baseValidation.number(false).test(this.command.detail.salary))
      this.notPassed.push({ message: 'Se requiere del salario.' });

    if (!this.baseValidation.number(false).test(this.command.detail.social_contribution))
      this.notPassed.push({ message: 'Se requiere de la aporte social.' });

    if (!this.baseValidation.number(false).test(this.command.detail.fortnightly_contribution))
      this.notPassed.push({ message: 'Se requiere del aporte quincenal.' });
  }

  validateAddress(): void {
    if (!this.baseValidation.string().test(this.command.address.street))
      this.notPassed.push({ message: 'Se requiere de la calle y número.' });

    if (!this.baseValidation.string().test(this.command.address.settlement))
      this.notPassed.push({ message: 'Se requiere de la colonia.' });

    if (!this.baseValidation.string().test(this.command.address.town))
      this.notPassed.push({ message: 'Se requiere de la localidad.' });

    if (!this.baseValidation.string().test(this.command.address.postal_code))
      this.notPassed.push({ message: 'Se requiere del código postal.' });

    if (!this.baseValidation.string().test(this.command.address.city_id))
      this.notPassed.push({ message: 'Se requiere de la ciudad.' });

    if (!this.baseValidation.string().test(this.command.address.phone))
      this.notPassed.push({ message: 'Se requiere del teléfono.' });

    if (!this.baseValidation.string().test(this.command.address.mobile))
      this.notPassed.push({ message: 'Se requiere del celular.' });

    if (!this.baseValidation.string().test(this.command.address.email))
      this.notPassed.push({ message: 'Se requiere del email.' });
  }

  validateWorkplace(): void {
    if (!this.baseValidation.string().test(this.command.workplace.key))
      this.notPassed.push({ message: 'Se requiere de la clave del centro de trabajo.' });

    if (!this.baseValidation.string().test(this.command.workplace.name))
      this.notPassed.push({ message: 'Se requiere del nombre del centro de trabajo.' });

    if (!this.baseValidation.string().test(this.command.workplace.phone))
      this.notPassed.push({ message: 'Se requiere del teléfono del centro de trabajo.' });
  }

  validateBeneficiaries(): void {
    const beneficiaryTotalPercentage = this.command.beneficiaries
      .map(item => parseInt(item.percentage.toString()))
      .reduce((sum, percentage) => sum + percentage, 0);

    this.command.beneficiaries.map((beneficiary: BeneficiaryInfo, index: number) => {
      if (beneficiaryTotalPercentage < 100) {
        if (!this.baseValidation.string().test(beneficiary.name))
          this.notPassed.push({ message: `Se requiere el nombre del beneficiario #${index+1}.` });

        if (!v8n().numeric().range(1,100).test(beneficiary.percentage))
          this.notPassed.push({ message: `Se requiere el porcentaje del beneficiario #${index+1} en un rango de 1% al 100%, el valor dado fue %${beneficiary.percentage}.` });
      }
    });
  }
}