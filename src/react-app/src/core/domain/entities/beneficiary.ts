export default class Beneficiary {
    constructor(readonly name: string, private percentage: number) {}

    updatePercentage(percentage: number) {
        this.percentage = percentage;
    }
}