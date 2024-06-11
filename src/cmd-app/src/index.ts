import ConfigAddress from "./database/seeds/address-seed";
import ConfigAgreement from "./database/seeds/agreement-seed";
import ConfigAssociateDetail from "./database/seeds/associate-detail-seed";
import ConfigAssociate from "./database/seeds/associate-seed";
import ConfigCity from "./database/seeds/city-seed";
import ConfigState from "./database/seeds/state-seed";
import ConfigWorkplace from "./database/seeds/workplace-seed";

(async () => {
  await ConfigAssociate();
  await ConfigState();
  await ConfigCity();
  await ConfigAddress();
  await ConfigAgreement();
  await ConfigWorkplace();
  await ConfigAssociateDetail();
})();