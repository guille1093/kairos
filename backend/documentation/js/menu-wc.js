'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">kairos-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' : 'data-bs-target="#xs-controllers-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' :
                                            'id="xs-controllers-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' }>
                                            <li class="link">
                                                <a href="controllers/ApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' : 'data-bs-target="#xs-injectables-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' :
                                        'id="xs-injectables-links-module-ApiModule-957b50f67541a9eca4355072ac13346298e108d1f4662d3d3939679296c46503550b8d0cea4c0751e288d8c2dd8981948ca013a850c4581b646f9b718cc2ba80"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-fdc3705947d08869d7dd13d5882f4b6cf6f5cedb32cdb594d4cd7d80aa315e6b5a38a6133ef96d652369ac030d101fb8ebfd1822ca477755e501a5addc098f11"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-fdc3705947d08869d7dd13d5882f4b6cf6f5cedb32cdb594d4cd7d80aa315e6b5a38a6133ef96d652369ac030d101fb8ebfd1822ca477755e501a5addc098f11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-fdc3705947d08869d7dd13d5882f4b6cf6f5cedb32cdb594d4cd7d80aa315e6b5a38a6133ef96d652369ac030d101fb8ebfd1822ca477755e501a5addc098f11"' :
                                        'id="xs-injectables-links-module-AuthModule-fdc3705947d08869d7dd13d5882f4b6cf6f5cedb32cdb594d4cd7d80aa315e6b5a38a6133ef96d652369ac030d101fb8ebfd1822ca477755e501a5addc098f11"' }>
                                        <li class="link">
                                            <a href="injectables/ApiKeyStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiKeyStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' :
                                            'id="xs-controllers-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' :
                                        'id="xs-injectables-links-module-CategoriesModule-796ded97188890765b40644da553ac3baef8ec1212ff556ed828de851bdc232ef786d95910a7eb26c056cea37cf585dd2c8bb9dceed5c2f75b859c83cc66e4c0"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' : 'data-bs-target="#xs-controllers-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' :
                                            'id="xs-controllers-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' : 'data-bs-target="#xs-injectables-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' :
                                        'id="xs-injectables-links-module-NotificationModule-8045a6b7f836695dcbafc4aac553b254c056c5b497ba4bd2ad09ea73bb35e08a7c35efc35535695103c55509382e31fb144362b95ff94e6d4672a3466a3b8e70"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationModule.html" data-type="entity-link" >OrganizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' : 'data-bs-target="#xs-controllers-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' :
                                            'id="xs-controllers-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' }>
                                            <li class="link">
                                                <a href="controllers/OrganizationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' : 'data-bs-target="#xs-injectables-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' :
                                        'id="xs-injectables-links-module-OrganizationModule-61a85a2f8076e1c43b57b8670e8caf88766cb4373c8d632c797133d4f79c3c737e61844e81c5cc0c7da352b1b806cbb25c71a0c03f0cf0c2a46ae83c63e02e91"' }>
                                        <li class="link">
                                            <a href="injectables/OrganizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentMethodModule.html" data-type="entity-link" >PaymentMethodModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' : 'data-bs-target="#xs-controllers-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' :
                                            'id="xs-controllers-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentMethodController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentMethodController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' : 'data-bs-target="#xs-injectables-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' :
                                        'id="xs-injectables-links-module-PaymentMethodModule-2a1554b3abebff8965b01e5f0645b48a93b452a486c42aaa31caa02b876778275e98bf526fc9e278de9fc3c7a6ecc36c8d40d703d352e5aeb2019328bf062386"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentMethodService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentMethodService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' :
                                            'id="xs-controllers-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' :
                                        'id="xs-injectables-links-module-UsersModule-14c250bb2db7afceb2fd936d3d93687b61427774d5ba388fb4499bda97373eef9848fc31e8ab22be0200a218b9e403e8c86e82096c29b811687e5657ea80ac44"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link" >UtilsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UtilsModule-db94e6bb3fa7777b9a5e97a9e0059238faa01310be0eaa4dbc45630472ab531add93a6d8a310378a336165ca96b3b1d262dd8c17383a5aeebc0f0a8332e10859"' : 'data-bs-target="#xs-injectables-links-module-UtilsModule-db94e6bb3fa7777b9a5e97a9e0059238faa01310be0eaa4dbc45630472ab531add93a6d8a310378a336165ca96b3b1d262dd8c17383a5aeebc0f0a8332e10859"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilsModule-db94e6bb3fa7777b9a5e97a9e0059238faa01310be0eaa4dbc45630472ab531add93a6d8a310378a336165ca96b3b1d262dd8c17383a5aeebc0f0a8332e10859"' :
                                        'id="xs-injectables-links-module-UtilsModule-db94e6bb3fa7777b9a5e97a9e0059238faa01310be0eaa4dbc45630472ab531add93a6d8a310378a336165ca96b3b1d262dd8c17383a5aeebc0f0a8332e10859"' }>
                                        <li class="link">
                                            <a href="injectables/UtilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Notification.html" data-type="entity-link" >Notification</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NotificationType.html" data-type="entity-link" >NotificationType</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Organization.html" data-type="entity-link" >Organization</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PaymentMethod.html" data-type="entity-link" >PaymentMethod</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddMessageDto.html" data-type="entity-link" >AddMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArrayGuidDTO.html" data-type="entity-link" >ArrayGuidDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotificationDto.html" data-type="entity-link" >CreateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrganizationDto.html" data-type="entity-link" >CreateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentMethodDto.html" data-type="entity-link" >CreatePaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomException.html" data-type="entity-link" >CustomException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomException-1.html" data-type="entity-link" >CustomException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomException-2.html" data-type="entity-link" >CustomException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomException-3.html" data-type="entity-link" >CustomException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultController.html" data-type="entity-link" >DefaultController</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultService.html" data-type="entity-link" >DefaultService</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultWithoutSecurityController.html" data-type="entity-link" >DefaultWithoutSecurityController</a>
                            </li>
                            <li class="link">
                                <a href="classes/googleOAuthDTO.html" data-type="entity-link" >googleOAuthDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migrations1717483943918.html" data-type="entity-link" >Migrations1717483943918</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migrations1719099417082.html" data-type="entity-link" >Migrations1719099417082</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationAlreadyExistsException.html" data-type="entity-link" >NotificationAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationGateway.html" data-type="entity-link" >NotificationGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationNoExistsException.html" data-type="entity-link" >NotificationNoExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationAlreadyExistsException.html" data-type="entity-link" >OrganizationAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationNoExistsException.html" data-type="entity-link" >OrganizationNoExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDTO.html" data-type="entity-link" >PaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentMethodAlreadyExistsException.html" data-type="entity-link" >PaymentMethodAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentMethodNoExistsException.html" data-type="entity-link" >PaymentMethodNoExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResposeDTO.html" data-type="entity-link" >ResposeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResposeResultsPaginationDTO.html" data-type="entity-link" >ResposeResultsPaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResposeSuccessDataDTO.html" data-type="entity-link" >ResposeSuccessDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResposeSuccessPaginationDTO.html" data-type="entity-link" >ResposeSuccessPaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchCategoryDto.html" data-type="entity-link" >SearchCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchCategoryPaginationDto.html" data-type="entity-link" >SearchCategoryPaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchNotificationDto.html" data-type="entity-link" >SearchNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchNotificationPaginationDto.html" data-type="entity-link" >SearchNotificationPaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchOrganizationDto.html" data-type="entity-link" >SearchOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchOrganizationPaginationDto.html" data-type="entity-link" >SearchOrganizationPaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchPaymentMethodDto.html" data-type="entity-link" >SearchPaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchPaymentMethodPaginationDto.html" data-type="entity-link" >SearchPaymentMethodPaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUserDTO.html" data-type="entity-link" >SearchUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchUserPaginationDTO.html" data-type="entity-link" >SearchUserPaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendNotificationsToUserDTO.html" data-type="entity-link" >SendNotificationsToUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SqlReader.html" data-type="entity-link" >SqlReader</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNotificationDto.html" data-type="entity-link" >UpdateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrganizationDto.html" data-type="entity-link" >UpdateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentMethodDto.html" data-type="entity-link" >UpdatePaymentMethodDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDTO.html" data-type="entity-link" >UpdateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAlreadyExistsException.html" data-type="entity-link" >UserAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsernamePasswordNoExistsException.html" data-type="entity-link" >UsernamePasswordNoExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNoExistsException.html" data-type="entity-link" >UserNoExistsException</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrmConfigService.html" data-type="entity-link" >TypeOrmConfigService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/JWTPayloadInterface.html" data-type="entity-link" >JWTPayloadInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});