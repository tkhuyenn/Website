<template>
  <div id="main-header" class="header h-100">
    <div class="body h-100">
      <div class="content-left be-flex align-center">
        <div class="logo cursor content-left__item" style="display: inline-flex" @click="redirect">
          <!-- <base-icon v-if="coinMain === 'LYNK'" icon="logo-header" style="color: #9900cc; display: inline-flex" /> -->
          <div v-if="coinMain === 'LYNK' && !getLogo" style="display: inline-flex">
            <img src="@/assets/images/market/logo-purple.png" alt="" />
            <!-- <base-icon vclass="d-iflex " icon="logo-purple" size="140" /> -->
            <!-- <base-icon vclass="d-iflex " icon="logo-purple" size="140" /> -->
          </div>
          <div v-if="coinMain === 'LYNK' && getLogo" style="display: inline-flex" class="logo-main">
            <img src="@/assets/images/market/logo-white.png" alt="" />
          </div>
          <div v-if="coinMain === 'LYNK' && getLogo" style="display: inline-flex" class="logo-second">
            <!-- <img src="@/assets/images/market/logo-purple.png" alt="" /> -->
            <base-icon vclass="d-iflex " icon="logo-purple" size="140" />
          </div>
          <img v-if="coinMain === 'CLM'" src="../../icons/png/logo-clm.png" alt="" style="width: 160px; height: 48px; object-fit: contain" />
        </div>
        <div class="content-left__item text-base cursor menu content-none" @click="handleCommand('home')">
          <span :class="isActiveHome ? 'active' : null" v-if="$route.name != 'home'"> IDO</span>
          <el-dropdown trigger="hover" class="dropdown-menu" @command="handleCommand" v-else>
            <span class="el-dropdown-link" :class="isActiveHome ? 'active' : null">IDO<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content menu-ido">
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item> -->
              <el-dropdown-item>
                <ul class="menu-items">
                  <li class="menu-item">
                    <a class="menu-link" href="#ecosystem">{{ $t('menu.Ecosystem') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#product">{{ $t('menu.Product') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#tokenomics">{{ $t('menu.Token') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item item-docs">
                    <a class="menu-link" href="#docs">{{ $t('menu.Docs') }}<i class="sack-menu-effect"></i></a>
                  </li>
                  <li class="menu-item">
                    <a class="menu-link" href="#roadmap">{{ $t('menu.Roadmap') }}<i class="sack-menu-effect"></i></a>
                  </li>

                  <li class="menu-item">
                    <a class="menu-link" href="#team">{{ $t('menu.Team') }}<i class="sack-menu-effect"></i></a>
                  </li>
                </ul>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <p>{{ $t('leftMenu.entertainment') }}</p>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div
          class="content-left__item text-base cursor menu content-none"
          @click="handleCommand('real-estate')"
          @mouseleave="isHoverMenuMarket = false"
          @mouseover="isHoverMenuMarket = true"
        >
          <!-- <p class="menu-market" :class="isActiveMarketplace ? 'active-market' : null">Marketplace</p> -->
          <el-popover
            :value="isVisible"
            placement="bottom"
            width="200"
            popper-class="popper-detail-category popper-detail-category--header"
            trigger="hover"
            @show="handleShowPopper"
            @hide="isVisible = false"
          >
            <div class="popper-category">
              <div
                class="cursor category-item"
                :class="item.id == $route.params.id && $route.name === 'DetailCategory' ? 'cate-active' : null"
                v-for="item in listCategoryFilter"
                :key="item.id"
                @click="handleCliclCategory(item.id)"
              >
                <div class="flex wrap-option">
                  <div v-if="item.levelDepth" class="item-name-child nft-header6 text-regular" :class="item.levelDepth > 1 ? 'item-child-last' : null">
                    <span>{{ item.categoryName }} </span>
                  </div>
                  <div v-else class="item-name item-parent nft-header6 text-bold">
                    <span>{{ item.categoryName }} </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="be-flex align-center value-category" slot="reference">
              <p class="menu-market" :class="isActiveMarketplace ? 'active-market' : null">Metamart</p>
              <base-icon
                :icon="isActiveMarketplace || isHoverMenuMarket ? (coinMain === 'LYNK' ? 'icon-arrow-bg' : 'icon-arrow-bg-clm') : 'icon-arrow-down-black'"
                size="16"
                class="d-iflex"
                style="padding-left: 2px"
                :class="isVisible ? 'rotate' : null"
              />
            </div>
          </el-popover>
        </div>
        <!-- <div class="content-left__item text-base cursor menu content-none">
          <el-dropdown trigger="hover" class="dropdown-menu" @command="handleCommand">
            <span class="el-dropdown-link">Marketplace<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
              <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item>
              <el-dropdown-item command="real-estate" :class="isActiveMenuEstate ? 'active' : null">
                <p>{{ $t('leftMenu.real-estate') }}</p>
              </el-dropdown-item>
              <el-dropdown-item>
                <p>{{ $t('leftMenu.entertainment') }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->
        <!-- <div class="content-left__item text-base cursor menu">
          <el-dropdown trigger="click" class="dropdown-menu">
            <span class="el-dropdown-link">Exchange<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
              <el-dropdown-item>
                <p>{{ $t('leftMenu.tourism') }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->

        <!-- <div class="text-2xl title" style="color: ">{{ getTitle }}</div> -->
      </div>

      <div class="content-right align-center content-none">
        <div class="content">
          <router-link v-if="moduleConfig.Crowdsale && isLogin" :to="{ name: 'CrowdSale' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('CrowdSale')">
              <p class="text-base">{{ $t('leftMenu.crowdsale') }}</p>
            </div>
          </router-link>

          <router-link v-if="isLogin" :to="{ name: 'Wallet' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.wallet') }}</p>
            </div>
          </router-link>
          <router-link v-if="isLogin || (!isLogin && walletAddress)" :to="{ name: 'MyProfileNft' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('MyProfileNft')">
              <p class="text-base">NFT</p>
            </div>
          </router-link>

          <!-- <router-link v-if="isLogin" :to="{ name: 'affiliate' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.order') }}</p>
            </div>
          </router-link> -->

          <div v-if="isLogin" class="line mr-24"></div>
          <span v-if="isLogin && !getLogo && !isActiveMenuAffiliate" @click="handleRedirect"> <base-icon icon="endow" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && !getLogo && isActiveMenuAffiliate && coinMain === 'LYNK'" @click="handleRedirect">
            <base-icon icon="endow-active" size="26" class="cursor mr-24"
          /></span>
          <span v-if="isLogin && !getLogo && isActiveMenuAffiliate && coinMain === 'CLM'" @click="handleRedirect">
            <base-icon icon="endow-active-clm" size="26" class="cursor mr-24"
          /></span>
          <!-- <span v-if="isLogin && getLogo" @click="handleRedirect" class="icon-main"> <base-icon icon="endow-mk" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirect" class="icon-second"> <base-icon icon="endow-mk-second" size="24" class="cursor mr-24" /></span> -->

          <span v-if="isLogin && !getLogo" @click="handleRedirectSupport"><base-icon icon="question" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirectSupport" class="icon-main"><base-icon icon="question-mk" size="24" class="cursor mr-24" /></span>
          <span v-if="isLogin && getLogo" @click="handleRedirectSupport" class="icon-second"><base-icon icon="question-mk-second" size="24" class="cursor mr-24" /></span>

          <div v-if="isLogin || (!isLogin && walletAddress)" class="avatar mr-24">
            <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #201f1e">
                <base-icon v-if="!user.avatar" icon="default-avatar" size="32" style="display: inline-flex" />
                <img v-else :src="user.avatar" />
              </span>

              <el-dropdown-menu slot="dropdown" class="header-downloadapp header-dropdown">
                <div class="dropdown-group">
                  <el-dropdown-item class="item-above">
                    <router-link :to="{ name: 'Profile' }" style="text-decoration: none">
                      <span v-if="!walletAddress" class="text-base text-bold black" style="padding-bottom: 4px">{{ user.displayName }}</span>
                      <span v-else class="text-base text-bold text-overflow-1 black" style="padding-bottom: 4px">{{ user.accountName }}</span>
                    </router-link>
                    <router-link :to="{ name: 'Profile' }" style="text-decoration: none">
                      <span v-if="user.email && !walletAddress" class="text-sm" style="color: #5b616e">{{ user.email }}</span>
                      <span v-else class="text-sm" style="color: #5b616e">{{ user.address | formatTransactionCode }}</span>
                    </router-link>
                  </el-dropdown-item>
                  <div class="line-drop"></div>
                  <!-- <el-dropdown-item
                    ><span>{{ $t('leftMenu.favorites') }}</span></el-dropdown-item
                  > -->
                  <!-- <el-dropdown-item
                    ><span>{{ $t('leftMenu.voucher') }}</span></el-dropdown-item
                  >
                  <div class="line-drop"></div> -->
                  <el-dropdown-item command="setting"
                    ><span :class="isActiveMenuSetting ? 'active' : null">{{ $t('leftMenu.setting') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item command="logout"
                    ><span>{{ $t('logout.title') }}</span></el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- <div v-if="!isLogin && walletAddress" class="be-flex align-center jc-space-between mr-24 wallet-address">
            <el-popover popper-class="popper-wallet-address" placement="bottom" width="350" trigger="click">
              <el-input placeholder="Please input" disabled :value="walletAddress">
                <template slot="append">
                  <div @click="handleCopyAddress"><base-icon icon="icon-copy" /></div>
                </template>
              </el-input>
              <div class="btn-default btn-disconnect" @click="handleLogoutMetamask">{{ $t('nft.disconnect') }}</div>
              <div class="btn-default btn-address" slot="reference">{{ walletAddress | formatTransactionCode(6, 4) }}</div>
            </el-popover>
          </div> -->

          <div v-if="!isLogin && !walletAddress" class="be-flex align-center jc-space-between mr-24 login" @click="handleCommand('login')">
            <base-icon icon="icon-not-login" size="28" style="display: inline-flex" />
            <span>{{ $t('leftMenu.login') }}</span>
          </div>
          <!-- <div v-if="!isLogin" class="be-flex align-center mr-24 login" @click="handleCommand('login')">
            <div class="menu-item">
              <a class="menu-link menu-link--btn"> <div class="btn-ido btn-login">Login</div></a>
            </div>
          </div> -->
          <div v-if="isLogin" class="line" style="margin-right: 12px"></div>
          <div
            class="language"
            :style="
              selectLanguage === 'vi'
                ? 'width:135px'
                : selectLanguage === 'ru'
                ? 'width: 135px'
                : selectLanguage === 'jp'
                ? 'width: 95px'
                : selectLanguage === 'cn'
                ? 'width: 110px'
                : 'width:115px'
            "
          >
            <el-select
              class="select-language select-language--header select-language--disable"
              v-model="selectLanguage"
              @change="handleChangeLanguage"
              :popper-class="
                selectLanguage === 'ru'
                  ? 'select-language-dropdown popper-select-language-header select-language-popper russian header-language'
                  : 'select-language-dropdown popper-select-language-header select-language-popper header-language'
              "
            >
              <el-option :label="`${$t('login.en')}`" value="en">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="flag-usa" size="14" style="margin-right: 4px" />
                    <span class="lang">{{ $t('login.en') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.vi')}`" value="vi">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="vietnam" size="14" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.vi') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.ru')}`" value="ru">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="russian" size="14" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.ru') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.kr')}`" value="kr">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="korea" size="14" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.kr') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.jp')}`" value="jp">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="japan" size="14" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.jp') }}</span>
                  </div>
                </template>
              </el-option>
              <el-option :label="`${$t('login.cn')}`" value="cn">
                <template>
                  <div class="be-flex flag">
                    <base-icon icon="china" size="14" style="margin-right: 4px; margin-left: -2px" />
                    <span class="lang" style="margin-left: 1px">{{ $t('login.cn') }}</span>
                  </div>
                </template>
              </el-option>
              <div class="suffix" slot="prefix">
                <base-icon v-if="selectLanguage !== 'vi'" class="flag-usa d-iflex lh-default" :icon="getIcon" size="22" />
                <base-icon v-else class="flag-vn d-iflex lh-default" :icon="getIcon" size="22" />
              </div>
            </el-select>
          </div>
          <!-- <div class="avatar">
            <img src="@/assets/images/avatar.png" alt="" />
          </div> -->
        </div>
      </div>
    </div>

    <div class="navbar-menu-icon cursor">
      <!-- <base-icon class="d-iflex" icon="fi_menu" size="24" /> -->
      <!-- <div class="menu-mobile"> -->
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <!-- </div> -->
      <!-- <img src="../../assets/image/noun_menu_white.png" alt="" /> -->
      <!-- <div class="icon-menu-black isHidden">
        <img src="../../assets/image/icon-menu-black.png" alt="" />
      </div> -->
    </div>
    <nav class="nav__mobile">
      <div class="nav__mobile-close">
        <!-- <img src="../../assets/image/iconX.png" alt="" /> -->
      </div>
      <el-collapse class="menu__mobile-items" v-model="activeName" accordion>
        <div class="h-100">
          <div class="line-menu">
            <el-collapse-item v-if="isActiveHome" class="collapse-item menu-link-change" title="IDO" name="1">
              <ul class="collapse-menu">
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#ecosystem">{{ $t('menu.Ecosystem') }}<i class="sack-menu-effect"></i></a>
                </li>
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#product">{{ $t('menu.Product') }}<i class="sack-menu-effect"></i></a>
                </li>
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#tokenomics">{{ $t('menu.Token') }}<i class="sack-menu-effect"></i></a>
                </li>
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#docs">{{ $t('menu.Docs') }}<i class="sack-menu-effect"></i></a>
                </li>
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#roadmap">{{ $t('menu.Roadmap') }}<i class="sack-menu-effect"></i></a>
                </li>

                <li class="collapse-menu__item">
                  <a class="menu-link" href="#team">{{ $t('menu.Team') }}<i class="sack-menu-effect"></i></a>
                </li>
                <li class="collapse-menu__item">
                  <a class="menu-link" href="#download_app">Download app<i class="sack-menu-effect"></i></a>
                </li>
              </ul>
            </el-collapse-item>
            <div v-else class="collapse-item-ido menu-link-change" @click="handleCommand('home')">IDO</div>
            <el-collapse-item title="Marketplace" class="menu-mobile-market" name="2">
              <!-- <ul class="collapse-menu"> -->
              <div class="popper-category style-content-maket">
                <div
                  class="cursor category-item menu-link-change"
                  :class="item.id == $route.params.id && $route.name === 'DetailCategory' ? 'cate-active' : null"
                  v-for="item in listCategoryFilter"
                  :key="item.id"
                  @click="handleCliclCategory(item.id)"
                >
                  <div class="flex wrap-option menu-link-change">
                    <div v-if="item.levelDepth" class="item-name-child nft-header6 text-regular" :class="item.levelDepth > 1 ? 'item-child-last' : null">
                      <span>{{ item.categoryName }} </span>
                    </div>
                    <div v-else class="item-name item-parent nft-header6 text-bold">
                      <span>{{ item.categoryName }} </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- </ul> -->
            </el-collapse-item>
          </div>
          <div class="line-menu" v-if="isLogin || (!isLogin && walletAddress)">
            <!-- <router-link v-if="moduleConfig.Crowdsale && isLogin" :to="{ name: 'CrowdSale' }" class="collapse-item-ido menu-link-change d-block">
            <div class="wrap" @click="handleRedirectHome('CrowdSale')">
              {{ $t('leftMenu.crowdsale') }}
            </div>
          </router-link>

          <router-link v-if="isLogin" :to="{ name: 'Wallet' }" class="collapse-item-ido menu-link-change d-block">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              {{ $t('leftMenu.wallet') }}
            </div>
          </router-link>
          <router-link v-if="isLogin || (!isLogin && walletAddress)" :to="{ name: 'MyProfileNft' }" class="collapse-item-ido menu-link-change d-block">
            <div class="wrap" @click="handleRedirectHome('MyProfileNft')">NFT</div>
          </router-link> -->

            <div class="collapse-item-ido menu-link-change" v-if="moduleConfig.Crowdsale && isLogin" @click="handleRedirectHome('CrowdSale')">{{ $t('leftMenu.crowdsale') }}</div>
            <div class="collapse-item-ido menu-link-change" v-if="isLogin" @click="handleRedirectHome('Wallet')">{{ $t('leftMenu.wallet') }}</div>
            <div class="collapse-item-ido menu-link-change" @click="handleRedirectHome('MyProfileNft')">NFT</div>
          </div>
          <div class="line-menu-top">
            <div class="collapse-item-ido menu-link-change" @click="handleRedirectHome('Profile')">Setting</div>
            <div class="collapse-item-ido menu-link-change" @click="handleRedirectDowload('download-app-ido')">Download app</div>
            <div class="language" :style="selectLanguage === 'vi' ? 'width:135px' : 'width:115px'">
              <el-select
                class="select-language select-language--header select-language--disable select-lang-mobile"
                v-model="selectLanguage"
                @change="handleChangeLanguage"
                popper-class="select-language-dropdown popper-select-language-header popper-select-language-header-mobile"
              >
                <p class="container-nft language_title">Choose a language and region</p>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.en')}`" value="en">
                  <template>
                    <div class="be-flex flag">
                      <!-- <base-icon icon="flag-usa" size="14" style="margin-right: 4px" /> -->
                      <span class="lang">{{ $t('login.en') }}</span>
                    </div>
                  </template>
                </el-option>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.vi')}`" value="vi">
                  <template>
                    <div class="be-flex flag">
                      <!-- <base-icon icon="flag-vn" size="19" style="margin-right: 4px; margin-left: -2px" /> -->
                      <span class="lang">{{ $t('login.vi') }}</span>
                    </div>
                  </template>
                </el-option>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.kr')}`" value="kr">
                  <template>
                    <div class="be-flex flag">
                      <span class="lang">{{ $t('login.kr') }}</span>
                    </div>
                  </template>
                </el-option>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.jp')}`" value="jp">
                  <template>
                    <div class="be-flex flag">
                      <span class="lang">{{ $t('login.jp') }}</span>
                    </div>
                  </template>
                </el-option>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.cn')}`" value="cn">
                  <template>
                    <div class="be-flex flag">
                      <span class="lang">{{ $t('login.cn') }}</span>
                    </div>
                  </template>
                </el-option>
                <el-option class="dropdown__item menu-link-change" :label="`${$t('login.ru')}`" value="ru">
                  <template>
                    <div class="be-flex flag">
                      <span class="lang">{{ $t('login.ru') }}</span>
                    </div>
                  </template>
                </el-option>
              </el-select>
            </div>
            <div v-if="isLogin" class="collapse-item-ido menu-link-change" @click="handleClickLogOut">{{ $t('title-sign-out') }}</div>
          </div>
        </div>
        <div style="padding: 0 24px">
          <div class="container-nft">
            <div class="sign-in-out-mobile container-nft">
              <el-button
                v-if="!isLogin && !walletAddress"
                @click="handleSignUp"
                style="display: flex; justify-content: center; align-items: center; padding: 0; margin: 0"
                class="is-border cursor btn-h40 btn-theme style-btn-mobile"
              >
                <p>{{ $t('title-sign-up') }}</p>
              </el-button>
              <el-button v-if="!isLogin && !walletAddress" @click="handleCommand('login')" class="btn is-none-border cursor btn-h40 btn-default-bg btn-theme style-btn-mobile">
                <p>{{ $t('title-log-in') }}</p>
              </el-button>

              <button v-else class="btn-default mr-16 text-regular btn-h40 button-cancel style-btn-mobile" @click="handleClickLogOut">
                <p class="text-cancel">{{ $t('title-sign-out') }}</p>
              </button>
            </div>
          </div>
        </div>
      </el-collapse>

      <!-- <ul class="menu__mobile-items"> -->
      <!-- <li class="menu-item nav__mobile-item" @click="handleCommand('home')">
          <span :class="isActiveHome ? 'active' : null" v-if="$route.name != 'home'"> IDO</span>
        </li> -->
      <!-- <li class="menu-item nav__mobile-item">
          <div class="content-left__item text-base cursor menu">
            <el-dropdown trigger="click" class="dropdown-menu" @command="handleCommand">
              <span class="el-dropdown-link">Marketplace<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-menu__content">
                <el-dropdown-item command="real-estate" :class="isActiveMenuEstate ? 'active' : null">
                  <p>{{ $t('leftMenu.real-estate') }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <i class="sack-menu-effect"></i>
        </li> -->
      <!-- <li class="menu-item nav__mobile-item" v-if="moduleConfig.Crowdsale && isLogin" style="height: 25px">
          <router-link :to="{ name: 'CrowdSale' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('CrowdSale')">
              <p class="text-base">{{ $t('leftMenu.crowdsale') }}</p>
            </div>
          </router-link>
          <i class="sack-menu-effect"></i>
        </li>
        <li class="menu-item nav__mobile-item" v-if="isLogin" style="height: 25px">
          <router-link :to="{ name: 'Wallet' }" class="router-header mr-24">
            <div class="wrap" @click="handleRedirectHome('Wallet')">
              <p class="text-base">{{ $t('leftMenu.wallet') }}</p>
            </div>
          </router-link>
          <i class="sack-menu-effect"></i>
        </li>
        <li class="menu-item nav__mobile-item">
          <div v-if="isLogin" class="avatar">
            <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #201f1e">
                <base-icon v-if="!user.avatar" icon="default-avatar" size="32" style="display: inline-flex" />
                <img v-else :src="user.avatar" style="width: 32px; height: 32px; border-radius: 50%" />
              </span>

              <el-dropdown-menu slot="dropdown" class="header-downloadapp header-dropdown" placement="bottom">
                <div class="dropdown-group">
                  <el-dropdown-item class="item-above">
                    <span class="text-base text-bold" style="padding-bottom: 4px">{{ user.fullName }}</span>
                    <span v-if="user.email" class="text-sm" style="color: #5b616e">{{ user.email }}</span>
                  </el-dropdown-item>
                  <div class="line-drop"></div>
                  <el-dropdown-item
                    ><span>{{ $t('leftMenu.favorites') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><span>{{ $t('leftMenu.voucher') }}</span></el-dropdown-item
                  >
                  <div class="line-drop"></div>
                  <el-dropdown-item command="setting"
                    ><span :class="isActiveMenuSetting ? 'active' : null">{{ $t('leftMenu.setting') }}</span></el-dropdown-item
                  >
                  <el-dropdown-item command="logout"
                    ><span>{{ $t('logout.title') }}</span></el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-if="!isLogin" class="be-flex align-center jf-bettwen login" @click="handleCommand('login')">
            <base-icon icon="icon-not-login" size="28" style="display: inline-flex" />
            <span>{{ $t('leftMenu.login') }}</span>
          </div>
          <i class="sack-menu-effect"></i>
        </li> -->
      <!-- </ul> -->
      <!-- <button class="btn-ido btn-downapp" style="margin-top: 20px" @click="clickDownApp">
        Download app -->
      <!-- <router-link :to="{ name: 'download-app' }" class="menu-link" style="text-decoration: none; color: #ffffff"> Download app </router-link> -->
      <!-- </button> -->
    </nav>
  </div>
</template>

<script lang="ts">
  import EventBus from '@/utils/eventBus'
  import includes from 'lodash/includes'
  import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import Moralis from 'moralis'
  import OnChainMixin from '@/mixins/onchain'

  import getRepository from '@/services/index'
  import NftRepository from '@/services/repositories/nft'
  const apiNft: NftRepository = getRepository('nft')

  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')
  const bcNft = namespace('bcNft')
  @Component
  export default class MainHeader extends Mixins(OnChainMixin) {
    @Prop({ required: false, type: Boolean, default: true }) showIdo!: boolean

    @bcAuth.Action('logout') logout!: (status?: boolean) => Promise<any>
    @bcAuth.Mutation('SET_INFO') setInfo!: (info: Record<string, any>) => Promise<any>
    @beBase.State('urlSystem') urlSystem!: Record<string, any>
    @bcAuth.State('moduleConfig') moduleConfig!: Record<string, any>

    @bcNft.State('listCategoryFilter') listCategoryFilter!: Array<Record<string, any>>
    @bcNft.Action('setCategoryFilter') setCategoryFilter!: (data: Record<string, any>) => void

    selectLanguage = ''
    image = ''

    isVisible = false
    isHoverMenuMarket = false
    categoryId = 0

    activeName = '1'

    get getTitle(): string {
      switch (this.$route.name) {
        case 'WalletLyn':
          return this.$t('menu.wallet') as string
        case 'WalletBtc':
          return this.$t('menu.wallet') as string
        case 'WalletEth':
          return this.$t('menu.wallet') as string
        case 'WalletClm':
          return this.$t('menu.wallet') as string
        case 'WalletBnb':
          return this.$t('menu.wallet') as string
        case 'WalletUsdt':
          return this.$t('menu.wallet') as string
        case 'WalletUsdc':
          return this.$t('menu.wallet') as string
        case 'CrowdSale':
          return this.$t('menu.crowdsale') as string
        case 'Nft':
          return this.$t('menu.nft') as string
        case 'affiliate':
          return this.$t('menu.affiliate') as string
        default:
          return this.$t('menu.setting') as string
      }
    }

    get getIcon(): string {
      let icon = 'vietnam'
      switch (this.selectLanguage) {
        case 'en':
          icon = 'flag-usa'
          break
        case 'ru':
          icon = 'russian'
          break
        case 'kr':
          icon = 'korea'
          break
        case 'jp':
          icon = 'japan'
          break
        case 'cn':
          icon = 'china'
          break
        default:
          icon = 'vietnam'
          break
      }
      return icon
      // return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }

    get getLogo(): boolean {
      if (this.$route.name === 'MarketPlace' || this.$route.name === 'home') {
        return true
      }
      return false
    }

    get isActiveMenuEstate(): boolean {
      return includes(this.$route.path, '/real-estate')
    }
    get isActiveMarketplace(): boolean {
      return includes(this.$route.path, '/marketplace') && !includes(this.$route.path, '/marketplace/my-profile')
    }

    get isActiveHome(): boolean {
      return this.$route.name == 'home'
    }

    get isActiveMenuSetting(): boolean {
      return includes(this.$route.path, '/setting')
    }
    get isActiveMenuAffiliate(): boolean {
      return includes(this.$route.path, '/affiliate')
    }

    handleShowPopper(): void {
      this.isVisible = true
    }
    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleCliclCategory(id: number): void {
      this.$router.push({ name: 'DetailCategory', params: { id: id + '' } })
    }
    handleClickLogOut(): void {
      if (this.walletAddress) {
        // const isWalletConnect = localStorage.getItem('walletconnect')
        // if (isWalletConnect) {
        //   this.disconnectWc().then(() => {
        //     this.logout(false)
        //     this.setWalletAddress('')
        //     this.setInfo({})
        //     this.$router.push({ name: 'login' })
        //   })
        // } else {
        Moralis.User.logOut().then(() => {
          this.logout(false)
          this.setWalletAddress('')
          this.setInfo({})
          this.$router.push({ name: 'login' })
        })
        // }
      } else {
        this.logout().then(() => {
          this.$router.push({ name: 'login' })
        })
      }
    }

    handleCommand(command: string): void {
      if (command === 'logout') {
        if (this.walletAddress) {
          Moralis.User.logOut().then(() => {
            this.logout(false)
            this.setWalletAddress('')
            this.setInfo({})
            this.$router.push({ name: 'login' })
          })
        } else {
          this.logout().then(() => {
            this.$router.push({ name: 'login' })
          })
        }
      }
      if (command === 'setting') {
        this.$router.push({ name: 'Profile' })
      }
      if (command === 'real-estate') {
        this.$router.push({ name: 'MarketMain' })
      }
      if (command === 'login') {
        this.$router.push({ name: 'login' })
      }
      if (command === 'home') {
        // this.$router.push({ name: 'home' })
        window.open(process.env.VUE_APP_URL)
      }
    }
    handleRedirect(): void {
      this.$router.push({ name: 'affiliate' })
    }

    handleRedirectSupport(): void {
      window.open(`${this.urlSystem['system.token.support.url']}`)
    }

    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    handleRedirectHome(name: string): void {
      if (this.$route.name === name) {
        window.location.reload()
      } else {
        this.$router.push({ name }).catch()
      }
    }
    handleRedirectDowload(name: string): void {
      let routeData = this.$router.resolve({ name })
      window.open(routeData.href, '_blank')
    }
    clickDownApp(): void {
      // console.log('saáa')
      this.getMobileOperatingSystem()
      if (this.getMobileOperatingSystem() === 'Android') {
        window.open('https://play.google.com/store/apps/details?id=vn.beedu.blockchain')
      }
      if (this.getMobileOperatingSystem() === 'iOS') {
        window.open('https://apps.apple.com/us/app/lynkey/id1591160349')
      }
    }
    getMobileOperatingSystem(): string {
      let userAgent = navigator.userAgent || navigator.vendor

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone'
      }

      if (/android/i.test(userAgent)) {
        return 'Android'
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        return 'iOS'
      }

      return 'unknown'
    }

    redirect(): void {
      if (this.$route.name === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
    async created(): Promise<void> {
      const categoryFilter = await apiNft.getListCategoryFilter()
      this.setCategoryFilter(categoryFilter)
      this.selectLanguage = window.localStorage.getItem('bc-lang')!
      EventBus.$on('pushAvatar', url => {
        this.user.avatar = url
      })
    }
    mounted(): void {
      let visibleMobile = document.querySelector('.navbar-menu-icon')! as HTMLElement
      let closeLI = document.querySelectorAll('.collapse-menu__item')
      let navMobile = document.querySelector('.nav__mobile')! as HTMLElement
      let body = document.body! as HTMLElement
      const menuLinkChange = document.querySelectorAll('.menu-link-change')
      menuLinkChange.forEach(element => {
        element.addEventListener('click', function () {
          console.log('e', element)
          navMobile.classList.toggle('chageActive')
          visibleMobile.classList.toggle('change')
          console.log('menu2')
          document.body.style['overflow-y'] = 'auto'
        })
      }),
        // let iconMenuWhite = document.querySelector('.icon-menu-white')
        // let iconMenuBlack = document.querySelector('.icon-menu-black')
        closeLI.forEach(item => {
          item.addEventListener('click', function () {
            navMobile.style.transform = 'translateX(150%)'
          })
        })
      // visibleMobile.addEventListener('click', function () {
      //   navMobile.style.transform = 'translateX(0%)'
      // })

      visibleMobile.addEventListener('click', function () {
        navMobile.classList.toggle('chageActive')
        visibleMobile.classList.toggle('change')

        body.classList.toggle('overflow-hidden')
      })

      // closeX.addEventListener('click', function () {
      //   navMobile.style.transform = 'translateX(150%)'
      // })
      // window.addEventListener('scroll', () => {
      //   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      //     iconMenuBlack?.classList.remove('isHidden')
      //     iconMenuWhite?.classList.add('isHidden')
      //   } else {
      //     iconMenuBlack?.classList.add('isHidden')
      //     iconMenuWhite?.classList.remove('isHidden')
      //   }
      // })
    }

    handleCopyAddress(): void {
      const el = document.createElement('input')
      el.value = this.walletAddress
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      const message = this.$t('notify.copy') as string
      this.$message.success(message)
    }

    handleLogoutMetamask(): void {
      this.setWalletAddress('')
      Moralis.User.logOut()
    }
  }
</script>

<style scoped lang="scss">
  .header {
    color: var(--bc-text-menu-header) !important;
    width: 99.9%;
    // height: 72px;
    // border-color: var(--bc-input-border);
    // border-bottom: 1px solid var(--bc-input-border);

    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 26px;

      @media (max-width: 1199px) {
        margin: 0 auto;
      }
      ::v-deep.content-left {
        // width: 50%;
        height: 100%;
        // padding: 20px 0px 20px 24px;

        &__item:not(:last-child) {
          margin-right: 40px;
        }
        // &__item {
        //   img {
        //     width: 84.6px;
        //     height: 28px;
        //   }
        // }

        .menu {
          &:hover {
            span {
              background: var(--bc-menu-active);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .menu-market {
              background: var(--bc-menu-active);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }

        .dropdown-menu {
          color: var(--bc-text-menu-header) !important;
          font-size: 16px;
          line-height: 24px;
          .el-icon--right {
            color: var(--bc-text-menu-header) !important;
          }
        }
      }
      .title {
        width: fit-content;
        height: 32px;
        font-weight: 600;
        color: var(--bc-text-discript2);
        line-height: 32px;
      }

      .content-right {
        width: 50%;
        height: 100%;
        // padding: 17px 24px 15px 0;
        display: flex;
        flex-direction: row-reverse;
        .content {
          // width: 232px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          div {
            display: inline-block;
            cursor: pointer;
          }
          .plus {
            width: 45.78px;
            height: 40px;
            border-radius: 50%;
            margin-right: 27px;
            position: relative;
            padding: 0;
            span {
              position: absolute;
              top: 20%;
              left: 20%;
            }
          }
          .notification {
            width: 24px;
            height: 24px;
            margin-right: 18px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .endow {
            width: 24px;
            height: 24px;
            margin-right: 20px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .question {
            width: 24px;
            height: 24px;
            margin-right: 24px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .avatar {
            width: 32px;
            height: 32px;
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .language {
            .suffix {
              .flag-usa {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 2px;
                display: block;
              }
              .flag-vn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 1px;
                display: block;
              }
            }
          }
          .line {
            display: block;
            height: 16px;
            // background: red;
            border: 1px solid #0e0b23;
          }
          .wallet-address {
            .btn-address {
              height: 40px;
              width: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 30px;
            }
          }
          .login {
            display: flex;
            span:nth-child(2) {
              padding-left: 4px;
            }
          }
          .router-header {
            .wrap {
              p {
                color: var(--bc-text-menu-header);
              }
            }
            &:hover {
              .wrap {
                p {
                  background: var(--bc-menu-active);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
              }
            }
          }
          .router-link-active {
            position: relative;
            .wrap {
              p {
                font-weight: 700;
                background: var(--bc-menu-active);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 2px;
              bottom: -22px;
              left: 0;
              background: var(--bc-menu-active);
            }
          }
        }
      }
    }
  }
  .btn-downapp {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px !important;
    line-height: 18px !important;
    font-weight: 700;
    padding: 15px 41px;
    width: 213px;
  }
  .el-select-dropdown__list {
    .language_title {
      font-size: 16px;
      line-height: 24px;
      color: #0a0b0d;
      margin-top: 24px;
      margin-bottom: 20px;
      font-weight: 600;
    }
  }
  .menu-items {
    .menu-item {
      .menu-link {
        text-decoration: none;
        font-size: 16px;
        color: #0e0b23;
        line-height: 24px;
      }
    }
  }
  .nav__mobile {
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    background: #fff;
    transition: 0.5s;
    transform: translateX(100%);
    color: #fff !important;
    z-index: 500;

    .text-base {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    .el-dropdown {
      color: #fff;
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    a.router-header {
      text-decoration: none;
      color: #fff;
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
    }
    .nav__mobile-item {
      margin-top: 36px;
    }
  }
  .nav__mobile-close {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    transition: 0.5s;
  }
  ::v-deep.menu__mobile-items {
    //margin-top: 24px;
    transition: 0.5s;
    padding: 0 24px 0 24px;
    border: none;
    overflow: auto;
    width: 100%;
    max-height: calc(100% - 100px);

    // &::-webkit-scrollbar {
    //   display: block;
    //   width: 3px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   background: #dbdbdb;
    //   border-radius: 4px;
    // }
    .line-menu {
      border-bottom: 1px solid var(--bc-table-border);
      margin-top: 24px;
    }
    .line-menu-top {
      margin-top: 24px;
    }
    // .line-top {
    //   border-top: 1px solid var(--bc-table-border);

    // }
    .el-collapse-item {
      margin-top: 0px;
      &__header {
        background-color: transparent;
        font-size: 16px;
        line-height: 24px;
        color: var(--bc-text-primary);
        font-weight: 400;
        padding-bottom: 24px;
        border-bottom: none;
        height: fit-content;
        .el-collapse-item__arrow {
          margin-right: 0;
        }
      }
      &__header.is-active {
        // border-bottom: 1px solid var(--bc-table-border);
        border-bottom: none;
      }
      &__wrap {
        // margin-top: 24px;
        background: transparent;
        border-bottom: none;
        margin-left: 15px;
        .el-collapse-item__content {
          padding-bottom: 14px;
          .collapse-menu {
            &__item {
              // margin-bottom: 16px;
              text-align: left;
              // width: fit-content;

              .menu-link {
                color: var(--bc-text-primary);
                text-decoration: none;
                font-size: 14px;
                line-height: 16px;
                // padding: 8px 0;
                display: inline-block;
                width: 100%;
              }
            }
            &__item:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .collapse-item-ido {
      font-size: 16px;
      line-height: 24px;
      color: var(--bc-text-primary);
      font-weight: 400;
      padding-bottom: 24px;
      border-bottom: none;
      text-align: left;
      text-decoration: none;
    }
  }
  .menu__mobile-items {
    &::-webkit-scrollbar {
      display: block;
      width: 3px;
    }
  }
  .navbar-menu-icon {
    display: none;
  }
  .header-scroll .logo-second {
    width: 130px;
    margin-top: -9px;
  }
  @media (max-width: 1200px) {
    .header {
      padding: 0 24px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .body {
        padding: unset;
        ::v-deep.content-left {
          // width: 50%;
          height: 100%;
          // padding: 20px 0px 20px 24px;

          &__item:not(:last-child) {
            margin-right: 10px !important;
          }
          &__item {
            img {
              width: 84.6px;
              height: 28px;
            }
          }
        }
      }
      .content-none {
        display: none !important;
      }
      .logo-main {
        width: 140px;
      }
    }
    .header-scroll .logo-second {
      width: 140px;
      margin-top: -13px;
      margin-right: -40px;
    }
    .navbar-menu-icon {
      display: block;
      .bar1,
      .bar2,
      .bar3 {
        background: var(--bc-text-primary);
        border-radius: 99px;
        margin: 4.5px 0;
        transition: 0.4s;
        width: 18px;
        height: 2px;
      }
    }
    .change .bar1 {
      -webkit-transform: rotate(-45deg) translate(-2px, 6px);
      transform: rotate(-45deg) translate(-2px, 6px);
    }

    .change .bar2 {
      opacity: 0;
    }

    .change .bar3 {
      -webkit-transform: rotate(45deg) translate(-3px, -7px);
      transform: rotate(45deg) translate(-3px, -7px);
    }
    .chageActive {
      transform: translateX(0);
    }

    .menu-link-change {
      cursor: pointer;
    }
    .sign-in-out-mobile {
      position: fixed;
      bottom: 0px;
      width: 100%;
      left: 0;
      z-index: 10;
      display: flex;
      padding: 20px 0px 32px;
      border-top: 1px solid #dbdbdb;
      margin-left: 24px;
      background-color: #fff;
      /* margin-top: 21px; */

      .style-btn-mobile {
        width: 100% !important;
        font-weight: 600;
        line-height: 20px;
      }
    }
  }
  ::v-deep.logo-second {
    display: none !important;
  }
  .icon-second {
    display: none;
  }
  .isHidden {
    display: none;
  }
  .lyn_key .header-scroll .nav__mobile .active {
    position: relative;
    border-bottom: unset;
    font-weight: 700 !important;
    background: unset;
    color: #fff;
    -webkit-background-clip: unset;
    -webkit-text-fill-color: unset;
  }
  .menu-market {
    &:hover {
      background: var(--bc-menu-active);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .active-market {
    background: var(--bc-menu-active);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -22px;
      left: 0;
      background: var(--bc-menu-active);
    }
  }
</style>
