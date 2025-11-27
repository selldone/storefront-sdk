# 🧩 Selldone Storefront — Smart Search Section

A modern, responsive search section for the **Selldone Storefront Page Builder**.
It connects directly to the Storefront public API to provide **real-time product suggestions** with images and navigation links.

---

## ⚙️ Overview

This section allows users to search for products, brands, or categories within the storefront.
When a user types at least **3 characters**, it fetches live search results from Selldone’s **Storefront Search API**.

Each suggestion shows:

* Product **title**
* Product **image** (fetched from CDN)
* A clickable link to the product page

---

## 🔍 Storefront Search API

### Endpoint

```js
window.XAPI.GET_SEARCH_QUERY(window.$storefront.name, query)
```

### Example Request

```js
const { data } = await axios.get(
  window.XAPI.GET_SEARCH_QUERY(window.$storefront.name, searchText)
);
```

### Example Response

```json
{
  "items": [
    {
      "id": 123,
      "title": "Wireless Headphones",
      "title_en": "Wireless Headphones",
      "icon": "products/123/icon.png",
      "cat": false,
      "query": false
    }
  ]
}
```

### Response Notes

* `id`: product unique identifier
* `title`: localized product name
* `icon`: image path in the shop CDN
* `cat`: indicates if the result is a category (`true`) or a product (`false`)
* `query`: internal flag (ignore in suggestions)

---

## 🖼 Retrieving Product Images from CDN

Selldone stores all images in its CDN.
To generate a valid image URL for a product or category, use:

```js
window.CDN.GET_SHOP_IMAGE_PATH(path, 128)
```

### Parameters

| Param  | Type     | Description                                                          |
| ------ | -------- | -------------------------------------------------------------------- |
| `path` | `string` | Image relative path returned by API (e.g. `"products/123/icon.png"`) |
| `size` | `number` | Optional image size. Recommended: `128` for search suggestions.      |

### Example

```js
function getImageUrl(path) {
  return window.CDN.GET_SHOP_IMAGE_PATH(path, 128);
}
```

---

## 🔗 Building Product Links

To navigate to the correct product page within the storefront, use:

```js
{
  name: window.$storefront.routes.PRODUCT_PAGE,
  params: { product_id: item.id }
}
```

If the item is a **category** (`item.cat === true`), you can redirect to `CATEGORY_PAGE` instead.

---

## 💻 Sample Vue 3 + Vuetify 3 Code

Below is a ready-to-use section implementation for the **Selldone Page Builder**.

```html
<!----vue---->
<template>
    <v-sheet
            :color="properties.background_color"
            class="d-flex align-center justify-center text-center py-16"
            style="min-height: 80vh;"
    >
        <v-container>
            <!-- 🟩 Title -->
            <div
                    class="mb-8"
                    :style="{
          fontSize: $vuetify.display.smAndDown
            ? properties.title_fontsize_mobile
            : properties.title_fontsize_desktop,
          fontWeight: properties.title_fontweight,
          color: properties.title_color,
          lineHeight: 1.2
        }"
            >
                {{ properties.title }}
            </div>

            <!-- 🟦 Search Box -->
            <div
                    style="position: relative; max-width: 600px; margin: 0 auto;"
                    @click.outside="showSuggestions = false"
            >
                <v-text-field
                        v-model="query"
                        variant="outlined"
                        rounded="xl"
                        hide-details
                        prepend-inner-icon="search"
                        :loading="isLoading"
                        :placeholder="properties.search_placeholder"
                        class="text-start"
                        :color="properties.search_color"
                        :bg-color="properties.search_bg"
                        :style="{ fontSize: properties.search_fontsize }"
                        @input="debouncedSearch"
                        @keydown.enter="goToSearchPage"
                ></v-text-field>


                <!-- 🟨 Suggestion Dropdown -->
                <transition name="fade-scale">
                    <v-card
                            v-if="showSuggestions && suggestions.length"
                            class="pa-2 mt-2 text-start"
                            elevation="8"
                            style="position: absolute; top: 100%; left: 0; right: 0; z-index: 100; border-radius: 16px;"
                    >
                        <v-list>
                            <v-list-item
                                    v-for="(item, i) in suggestions"
                                    :key="i"
                                    :to="getProductTo(item)"
                                    class="hoverable-item"
                                    style="border-radius: 12px; transition: background 0.2s ease;"
                            >
                                <template v-slot:prepend>
                                    <v-avatar size="48" rounded="lg">
                                        <v-img
                                                v-if="item.icon"
                                                :src="getImageUrl(item.icon)"
                                                cover
                                        ></v-img>
                                        <v-icon v-else>image_not_supported</v-icon>
                                    </v-avatar>
                                </template>

                                <v-list-item-title class="ms-2">
                  <span style="font-weight: 600; font-size: 16px;">
                    {{ item.title }}
                  </span>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </transition>
            </div>
        </v-container>
    </v-sheet>
</template>

<script>
    config = {
        props: {
            properties: {
                default: () => ({
                    background_color: "#f9fafb",
                    title: "What product are you looking for?",
                    title_color: "#222",
                    title_fontsize_desktop: "38px",
                    title_fontsize_mobile: "26px",
                    title_fontweight: "700",

                    search_placeholder: "Search for products, brands, or categories...",
                    search_bg: "#ffffff",
                    search_color: "#333333",
                    search_fontsize: "16px"
                })
            }
        },
        data() {
            return {
                query: "",
                suggestions: [],
                isLoading: false,
                showSuggestions: false,
                debounceTimer: null
            };
        },
        methods: {
            // ✅ Debounced search (delay 300ms)
            debouncedSearch() {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.onSearch(), 300);
            },

            // ✅ Fetch suggestions from Storefront API
            async onSearch() {
                const val = this.query.trim();
                if (!val || val.length < 3) {
                    this.suggestions = [];
                    this.showSuggestions = false;
                    return;
                }

                this.isLoading = true;
                try {
                    const { data } = await axios.get(
                            window.XAPI.GET_SEARCH_QUERY(window.$storefront.name, val)
                    );

                    this.suggestions = data.items
                            ? data.items.filter((item) => !item.query).slice(0, 12)
                            : [];

                    this.showSuggestions = this.suggestions.length > 0;
                } catch (err) {
                    console.error("Search error:", err);
                } finally {
                    this.isLoading = false;
                }
            },

            // ✅ Correct image path (Storefront CDN) → use size=128
            getImageUrl(path, size = 128) {
                try {
                    return window.CDN.GET_SHOP_IMAGE_PATH(path, size);
                } catch {
                    return "https://placehold.co/100x100";
                }
            },

            // ✅ Product page route
            getProductTo(item) {
                if (!item || !item.id) return "#";
                return {
                    name: window.$storefront?.routes?.PRODUCT_PAGE,
                    params: { product_id: item.id }
                };
            },

            // ✅ Go to search page on Enter
            goToSearchPage() {
                if (!this.query || this.query.length < 2) return;
                const searchQuery = this.query.trim();
                this.$router.push({
                    name: window.$storefront.routes.SHOP_PAGE,
                    query: { search: searchQuery }
                });
            }
        }
    };
</script>

<style scoped>
    .hoverable-item:hover {
        background-color: #f2f2f2;
    }
    .v-text-field input {
        border-radius: 24px !important;
    }

    /* ✨ Fade + Scale animation for dropdown */
    .fade-scale-enter-active,
    .fade-scale-leave-active {
        transition: all 0.25s ease;
    }
    .fade-scale-enter-from,
    .fade-scale-leave-to {
        opacity: 0;
        transform: scale(0.98);
    }
</style>
```

---

## 🧠 Summary for AI Models

| Concept              | Purpose                    | Implementation                                                                      |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| **Search API**       | Fetch products by query    | `window.XAPI.GET_SEARCH_QUERY(window.$storefront.name, query)`                      |
| **CDN Image**        | Load product images        | `window.CDN.GET_SHOP_IMAGE_PATH(path, 128)`                                         |
| **Routing**          | Navigate to product page   | `{ name: window.$storefront.routes.PRODUCT_PAGE, params: { product_id: item.id } }` |
| **Debounce**         | Prevent multiple API calls | Delay 300 ms after input                                                            |
| **Suggestion Limit** | UI optimization            | `.slice(0, 12)`                                                                     |
| **Animation**        | Smooth dropdown            | Vue `<transition name="fade-scale">`                                                |

---

## 🧩 Integration Notes

1. Copy this section into a **Selldone Page Builder custom component**.
2. Ensure `axios`, `window.XAPI`, and `window.CDN` are globally available in the storefront.
3. Adjust `title` and color properties inside `properties` as needed.
4. The component auto-detects `$storefront.name` for the correct API domain.

---

**Author:** Selldone AI Assistant
**Version:** 1.0
**Compatible With:** Selldone Storefront + Vuetify 3
**License:** Internal Use (Selldone Platform)
