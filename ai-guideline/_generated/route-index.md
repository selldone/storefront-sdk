# Generated Storefront Route Index

Generated from `src/Applications/Storefront/router/StorefrontRouter.ts` and normalized to public path patterns. Prefix every path with the runtime `shop-prefix-address` meta value when it is not empty.

| Surface | Path pattern | Route name | Component | Behavior | Source |
|---|---|---|---|---|---|
| Home selected by custom-home meta | `/` | `StorefrontRoutesName.BLOGS_PAGE / AVOCADO_PAGE / HYPER_PAGE / SHOP_PAGE / MAP_PRODUCTS_PAGE / CUSTOM_HOME_PAGE` | `getRouteForHome` | dynamic home: blog, avocado, hyper, community, shop, map, landing page id | `src/Applications/Storefront/router/StorefrontRouter.ts:272` |
| Login welcome | `/welcome` | `StorefrontRoutesName.SHOP_LOGIN_PAGE` | `StorefrontPageLogin` | public login UI | `src/Applications/Storefront/router/StorefrontRouter.ts:376` |
| Products listing | `/shop` | `StorefrontRoutesName.SHOP_PAGE` | `StorefrontPageProducts` | search, filters, category folders, product cards | `src/Applications/Storefront/router/StorefrontRouter.ts:385` |
| Category listing | `/:category_name-category` | `StorefrontRoutesName.SHOP_CATEGORY_PAGE` | `StorefrontPageProducts` | category slug route | `src/Applications/Storefront/router/StorefrontRouter.ts:396` |
| Vendor listing | `/@:slug-:vendor_id` | `StorefrontRoutesName.SHOP_VENDOR_PAGE` | `StorefrontPageProducts` | marketplace vendor product listing | `src/Applications/Storefront/router/StorefrontRouter.ts:407` |
| Vendor landing page | `/vendor/@:slug-:vendor_id` | `StorefrontRoutesName.SHOP_VENDOR_CUSTOM_LANDING_PAGE` | `StorefrontPageLanding` | vendor custom page | `src/Applications/Storefront/router/StorefrontRouter.ts:416` |
| Page builder page | `/pages/:page_name` | `StorefrontRoutesName.PAGE_RENDER` | `StorefrontPageLanding` | custom landing/page render | `src/Applications/Storefront/router/StorefrontRouter.ts:428` |
| Include profile page | `/in/:path-:include_id` | `StorefrontRoutesName.INCLUDE_PAGE_RENDER` | `StorefrontPageLanding` | dynamic include page | `src/Applications/Storefront/router/StorefrontRouter.ts:439` |
| Product detail | `/product/:product_id` | `StorefrontRoutesName.PRODUCT_PAGE` | `StorefrontPageProduct` | full product page, buy, article, sections | `src/Applications/Storefront/router/StorefrontRouter.ts:449` |
| Product comparison | `/comparison` | `StorefrontRoutesName.COMPARISON_PAGE` | `StorefrontPageComparison` | product compare list | `src/Applications/Storefront/router/StorefrontRouter.ts:460` |
| Mobile shop info | `/info` | `StorefrontRoutesName.SHOP_INFO_PAGE_MOBILE` | `StorefrontPageInfo` | mobile info/footer alternative | `src/Applications/Storefront/router/StorefrontRouter.ts:470` |
| Basket cart | `/basket/:type` | `StorefrontRoutesName.BASKET_PAGE` | `StorefrontPageBasketCart` | cart and checkout by product type | `src/Applications/Storefront/router/StorefrontRouter.ts:477` |
| User shell | `/user` | `unnamed parent` | `StorefrontPageUser` | customer account layout | `src/Applications/Storefront/router/StorefrontRouter.ts:483` |
| User orders parent | `/user/orders` | `StorefrontRoutesName.ORDERS_PAGE` | `StorefrontPageUserOrders` | order history tabs parent | `src/Applications/Storefront/router/StorefrontRouter.ts:491` |
| User physical orders | `/user/orders/physical` | `StorefrontRoutesName.HISTORY_ORDERS_PHYSICAL` | `StorefrontPageUserOrdersPhysical` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:498` |
| User virtual orders | `/user/orders/virtual` | `StorefrontRoutesName.HISTORY_ORDERS_VIRTUAL` | `StorefrontPageUserOrdersVirtual` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:504` |
| User file orders | `/user/orders/file` | `StorefrontRoutesName.HISTORY_ORDERS_FILE` | `StorefrontPageUserOrdersFile` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:511` |
| User service orders | `/user/orders/service` | `StorefrontRoutesName.HISTORY_ORDERS_SERVICE` | `StorefrontPageUserOrdersService` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:518` |
| User subscription orders | `/user/orders/subscription` | `StorefrontRoutesName.HISTORY_ORDERS_SUBSCRIPTION` | `StorefrontPageUserOrdersSubscription` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:525` |
| User POS orders | `/user/orders/pos` | `StorefrontRoutesName.HISTORY_ORDERS_POS` | `StorefrontPageUserOrdersPos` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:531` |
| User avocado orders | `/user/orders/avocado` | `StorefrontRoutesName.HISTORY_ORDERS_AVOCADO` | `StorefrontPageUserOrdersAvocado` | history list | `src/Applications/Storefront/router/StorefrontRouter.ts:537` |
| User profile | `/user/profile` | `StorefrontRoutesName.USER_PROFILE_PAGE` | `StorefrontPageUserProfile` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:546` |
| User addresses | `/user/addresses` | `StorefrontRoutesName.USER_ADDRESSES_PAGE` | `StorefrontUserAddresses` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:556` |
| User returns | `/user/orders-return` | `StorefrontRoutesName.USER_RETURN_REQUESTS` | `StorefrontPageUserReturns` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:566` |
| User wishlist | `/user/favorites` | `StorefrontRoutesName.USER_FAVORITES_PAGE` | `StorefrontPageUserWishlist` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:576` |
| User comments | `/user/comments` | `StorefrontRoutesName.USER_COMMENTS_PAGE` | `StorefrontPageUserComments` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:586` |
| User gift cards | `/user/gift-cards` | `StorefrontRoutesName.USER_GIFTCARDS_PAGE` | `StorefrontPageUserGiftcards` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:596` |
| User wallets | `/user/wallets` | `StorefrontRoutesName.USER_WALLETS_PAGE` | `StorefrontPageUserWallets` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:606` |
| OAuth callback | `/selldone-callback` | `StorefrontRoutesName.LOGIN_REDIRECT` | `StorefrontPageLoginRedirect` | login redirect handler | `src/Applications/Storefront/router/StorefrontRouter.ts:618` |
| Blog list | `/blog` | `StorefrontRoutesName.BLOGS_PAGE / SHOP_BLOGS_PAGE` | `StorefrontPageBlogsList` | blog list and legacy route | `src/Applications/Storefront/router/StorefrontRouter.ts:629` |
| Author page | `/team/:author-:author_id` | `StorefrontRoutesName.AUTHOR_PAGE` | `StorefrontPageBlogsList` | author/team blog filter | `src/Applications/Storefront/router/StorefrontRouter.ts:641` |
| Blog post by slug | `/blog/:slug-:blog_id` | `StorefrontRoutesName.SHOP_BLOG_PAGE_SLUG` | `StorefrontPageBlogsView` | blog details | `src/Applications/Storefront/router/StorefrontRouter.ts:654` |
| Blog post by id | `/blog/:blog_id` | `StorefrontRoutesName.SHOP_BLOG_PAGE` | `StorefrontPageBlogsView` | legacy blog details | `src/Applications/Storefront/router/StorefrontRouter.ts:659` |
| About us | `/about-us` | `StorefrontRoutesName.SHOP_PROFILE_PAGE_ABOUT_US` | `StorefrontPageOfficialAboutUs` | shop official profile | `src/Applications/Storefront/router/StorefrontRouter.ts:670` |
| Terms | `/terms` | `StorefrontRoutesName.SHOP_PROFILE_PAGE_TERMS` | `StorefrontPageOfficialTerms` | shop official profile | `src/Applications/Storefront/router/StorefrontRouter.ts:676` |
| Privacy | `/privacy` | `StorefrontRoutesName.SHOP_PROFILE_PAGE_PRIVACY` | `StorefrontPageOfficialPrivacy` | shop official profile | `src/Applications/Storefront/router/StorefrontRouter.ts:683` |
| Contact us | `/contact-us` | `StorefrontRoutesName.SHOP_CONTACT_US` | `StorefrontPageOfficialContactUs` | contact form | `src/Applications/Storefront/router/StorefrontRouter.ts:689` |
| FAQ | `/faq/:tag?` | `ShopFAQ` | `StorefrontPageFaq` | faq tags, list, ask question | `src/Applications/Storefront/router/StorefrontRouter.ts:698` |
| Physical order detail | `/orders/physical/SM-:basket_id` | `MyPhysicalOrderInfoPage` | `StorefrontPageBasketOrderPhysicalDashboard` | order detail | `src/Applications/Storefront/router/StorefrontRouter.ts:712` |
| Virtual order detail | `/orders/virtual/SV-:basket_id` | `MyVirtualOrderInfoPage` | `StorefrontPageBasketOrderVirtualDashboard` | order detail | `src/Applications/Storefront/router/StorefrontRouter.ts:719` |
| File order detail | `/orders/file/SF-:basket_id` | `MyFileOrderInfoPage` | `StorefrontPageBasketOrderFileDashboard` | order detail | `src/Applications/Storefront/router/StorefrontRouter.ts:726` |
| Service order detail | `/orders/service/SS-:basket_id` | `MyServiceOrderInfoPage` | `StorefrontPageBasketOrderServiceDashboard` | order detail | `src/Applications/Storefront/router/StorefrontRouter.ts:733` |
| Subscription order detail | `/orders/subscription/SN-:basket_id` | `MySubscriptionOrderInfoPage` | `StorefrontPageBasketOrderSubscriptionDashboard` | order detail | `src/Applications/Storefront/router/StorefrontRouter.ts:741` |
| POS order detail | `/orders/pos/POS-:basket_id` | `MyPOSOrderInfoPage` | `StorefrontPagePosOrderDashboard` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:760` |
| Avocado order detail | `/orders/avocado/AVO-:basket_id` | `AvocadoOrderDetailPage` | `StorefrontPageAvocadoOrderDashboard` | requiresAuth | `src/Applications/Storefront/router/StorefrontRouter.ts:778` |
| Map products | `/map` | `StorefrontRoutesName.MAP_PRODUCTS_PAGE` | `StorefrontPageMapProducts` | fullscreen map products | `src/Applications/Storefront/router/StorefrontRouter.ts:796` |
| Map vendors | `/map-vendors` | `unnamed` | `StorefrontPageMapVendors` | fullscreen map vendors | `src/Applications/Storefront/router/StorefrontRouter.ts:804` |
| Instagram channel | `/instagram` | `InstagramPage` | `StorefrontPageInstagram` | channel=instagram | `src/Applications/Storefront/router/StorefrontRouter.ts:829` |
| Avocado order form by hash | `/avocado/:hash` | `AvocadoOrderPage` | `StorefrontPageAvocadoCart` | open avocado order cart | `src/Applications/Storefront/router/StorefrontRouter.ts:854` |
| Avocado inquiry | `/avocado` | `StorefrontRoutesName.AVOCADO_PAGE` | `StorefrontPageAvocado` | avocado inquiry page | `src/Applications/Storefront/router/StorefrontRouter.ts:866` |
| Hyper order detail | `/hyper/:basket_id` | `HyperOrderPage` | `StorefrontPageHyperOrder` | hyper order page | `src/Applications/Storefront/router/StorefrontRouter.ts:882` |
| Hyper cart | `/hyper` | `StorefrontRoutesName.HYPER_PAGE` | `StorefrontPageHyperCart` | hyper inquiry/cart page | `src/Applications/Storefront/router/StorefrontRouter.ts:894` |
| POS scan cart | `/pos/:basket_id` | `ShopPOSPage` | `SStorefrontPOSPage` | customer POS basket view | `src/Applications/Storefront/router/StorefrontRouter.ts:909` |
| Community home | `/community` | `CommunityRoutesName.COMMUNITY_HOME_PAGE` | `CommunityHomePage` | community categories/home | `src/Applications/Storefront/router/StorefrontRouter.ts:926` |
| Community feed | `/community/feed` | `CommunityFeedPage` | `CommunityFeedPage` | feed | `src/Applications/Storefront/router/StorefrontRouter.ts:947` |
| Community comments | `/community/comments` | `CommunityMyCommentsPage` | `CommunityMyCommentsPage` | my comments | `src/Applications/Storefront/router/StorefrontRouter.ts:953` |
| Community category | `/community/:category_id-:category_slug?` | `CommunityRoutesName.COMMUNITY_CATEGORY_PAGE` | `CommunityCategoryPage` | topics list | `src/Applications/Storefront/router/StorefrontRouter.ts:960` |
| Community topic | `/community/:category_id-:category_slug?/:topic_id-:topic_slug?` | `CommunityRoutesName.COMMUNITY_TOPIC_PAGE` | `CommunityTopicPage` | topic detail | `src/Applications/Storefront/router/StorefrontRouter.ts:967` |
| Listing home | `/listing` | `StorefrontListingPage` | `StorefrontPageListing` | directory/listing root | `src/Applications/Storefront/router/StorefrontRouter.ts:983` |
| Listing compare | `/listing/compare` | `StorefrontListingCompare` | `StorefrontPageListingCompare` | listing item comparison | `src/Applications/Storefront/router/StorefrontRouter.ts:999` |
| Listing category | `/listing/:category?` | `StorefrontListing` | `StorefrontPageListing` | listing category slug/id | `src/Applications/Storefront/router/StorefrontRouter.ts:1007` |
| Listing item profile | `/listing/:category/:item` | `StorefrontListingItemProfile` | `StorefrontPageListingItem` | item segment is slug-id or id | `src/Applications/Storefront/router/StorefrontRouter.ts:1019` |
| 404 fallback | `/:pathMatch(.*)*` | `unnamed` | `StorefrontPageError404` | catch all | `src/Applications/Storefront/router/StorefrontRouter.ts:1041` |
