import ContributionInfo from "../info/contribution-info";

export default interface ContributionCreateCommand extends ContributionInfo {
  commandId?: string;
}