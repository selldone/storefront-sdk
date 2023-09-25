import SetupService from "../../../../core/server/SetupService";
import { LocalStorages } from "../../../../core/helper/local-storage/LocalStorages";

export function StorefrontAxiosSetup() {
  const shop_name = SetupService.GetMetaValue("shop-name");
  const shop_prefix_address = SetupService.GetMetaValue(
    "shop-prefix-address",
    ""
  );

  window.axios = require("axios");

  // 🞧 Header: CORS
  window.axios.defaults.headers.common["Access-Control-Allow-Origin"] =
    SetupService.MainServiceUrl();
  window.axios.defaults.headers.common["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";

  if (window.SelldoneUser) {
    console.log(window.SelldoneUser.expires_in);
    // 🞧 Header: Authorization
    window.axios.defaults.headers.common["Authorization"] =
      "Bearer " + window.SelldoneUser.access_token;

    const expire_date = new Date();
    expire_date.setUTCSeconds(window.SelldoneUser.expires_in);

    window.$cookies.set(
      "access_token",
      window.SelldoneUser.access_token,
      expire_date.toUTCString(),
      shop_prefix_address,
      null,
      false
    );
  } else {
    const access_token = window.$cookies.get("access_token");

    if (access_token) {
      // User previously login
      // 🞧 Header: Authorization
      window.axios.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
    }
  }

  // Set CSRF token:
  const token = SetupService.GetMetaValue("csrf-token");

  if (token) {
    // 🞧 Header: CSRF
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
  } else {
    console.warn("CSRF token not found!");
  }

  // 🞧 Header: Previous and current location (when app open)
  window.axios.defaults.headers.common["S-Referrer"] =
    SetupService.GetReferrerMeta();
  window.axios.defaults.headers.common["S-Location"] = window.location.href;
  // 🞧 Get temporary access key. (Used in show inactive shops to admins)
  window.axios.defaults.headers.common["S-Temp-Access"] =
    SetupService.GetTemporaryAccessKey();

  // 🞧 Popup: We save seen_pops in localstorage (Client) and send in the header request
  const seen_pops = localStorage.getItem(
    LocalStorages.GetSeenPopups(`shop/@${shop_name}/`)
  );
  if (seen_pops) {
    window.axios.defaults.headers.common["S-Pops"] = seen_pops;
  }

  // ━━━ Headers ━━━
  // Setting campaign, marketing, affiliate, and guest data in headers.

  //――――――――――――――――――――――――― Set Campaign data in header ―――――――――――――――――――――――――
  // Can be secure signed id!

  if (SetupService.GetCampaignId()) {
    // 🞧 Header: Campaign
    window.axios.defaults.headers.common["campaign_id"] =
      SetupService.GetCampaignId();
  }
  if (SetupService.GetCampaignLinkId()) {
    // 🞧 Header: Campaign link
    window.axios.defaults.headers.common["link_id"] =
      SetupService.GetCampaignLinkId();
  }

  //――――――――――――――――――――――――― Set Email Marketing data in header ―――――――――――――――――――――――――
  if (SetupService.GetEmailId()) {
    // 🞧 Header: Email campaign
    window.axios.defaults.headers.common["email_id"] =
      SetupService.GetEmailId();
  }

  //――――――――――――――――――――――――― Set Affiliate data in header ―――――――――――――――――――――――――
  if (SetupService.GetAffiliateId()) {
    // 🞧 Header: Affiliate
    window.axios.defaults.headers.common["affiliate_id"] =
      SetupService.GetAffiliateId();
  }

  //――――――――――――――――――――――――― Set Guest Code in header ―――――――――――――――――――――――――
  // ▀▀▀▀▀▀▀▀▀ 🥶 Guest ▀▀▀▀▀▀▀▀▀
  // Set guest code (use for guest basket)
  if (LocalStorages.GetShopGuestCode()) {
    // 🞧 Header: Add guest code to all headers:
    window.axios.defaults.headers.common["S-Guest"] =
      LocalStorages.GetShopGuestCode();
  }
}
