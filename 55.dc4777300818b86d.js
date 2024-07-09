(self["webpackChunkfood_manager"] = self["webpackChunkfood_manager"] || []).push([[55],{

/***/ 8031:
/*!******************************************************!*\
  !*** ./src/app/consts/employee-status-vocabulary.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STATUSES: () => (/* binding */ STATUSES)
/* harmony export */ });
const STATUSES = {
  "Working": 'Работает',
  "NotWorking": 'Не работает'
};

/***/ }),

/***/ 3318:
/*!*********************************!*\
  !*** ./src/app/consts/roles.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROLES: () => (/* binding */ ROLES)
/* harmony export */ });
const ROLES = ['Admin', 'User', 'Dining'];

/***/ }),

/***/ 2403:
/*!********************************************!*\
  !*** ./src/app/consts/weeks-vocabulary.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DAYS_OF_WEEK: () => (/* binding */ DAYS_OF_WEEK),
/* harmony export */   DISHES: () => (/* binding */ DISHES),
/* harmony export */   WEEKS: () => (/* binding */ WEEKS)
/* harmony export */ });
const DAYS_OF_WEEK = {
  "day1": 'Понедельник',
  "day2": 'Вторник',
  "day3": 'Среда',
  "day4": 'Четверг',
  "day5": 'Пятница'
};
const WEEKS = {
  "week1": 'Неделя 1',
  "week2": 'Неделя 2',
  "week3": 'Неделя 3',
  "week4": 'Неделя 4'
};
const DISHES = {
  "firstCourse": "Первое",
  "secondCourse": "Второе",
  "sideDish": "Гарнир",
  "salad": "Салат"
};

/***/ }),

/***/ 8740:
/*!***********************************************!*\
  !*** ./src/app/core/services/week.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WeekService: () => (/* binding */ WeekService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ 610);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ 665);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ 8797);
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/daygrid */ 5660);
/* harmony import */ var _fullcalendar_core_locales_ru__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fullcalendar/core/locales/ru */ 3280);
var _WeekService;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let WeekService = (_WeekService = class WeekService {
  constructor() {}
  getCurrentWeek(weeksLength) {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const currentWeekNumber = Math.floor(diff / (oneDay * 7)) % weeksLength + 1;
    return `week${currentWeekNumber}`;
  }
  getWeekRangesForCurrentYear() {
    const ranges = [];
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
    let currentStartOfWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(startOfYear, {
      weekStartsOn: 1
    });
    while (currentStartOfWeek <= endOfYear) {
      const currentEndOfWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.endOfWeek)(currentStartOfWeek, {
        weekStartsOn: 1
      });
      ranges.push({
        start: currentStartOfWeek,
        end: currentEndOfWeek
      });
      currentStartOfWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.addDays)(currentEndOfWeek, 1);
    }
    return ranges;
  }
  getWeeksCalendarOptions(menu) {
    const colors = ['#63A0EB', '#EB4F67', '#9BD366', '#F6C855', '#F4BCDB', '#96CFEB', '#F096A2', '#68A33A', '#D09433', '#B077B0', '#3567A4', '#DD6DA7', '#499E8D', '#EF8532'];
    const weekRanges = this.getWeekRangesForCurrentYear();
    const events = weekRanges.map((range, index) => ({
      title: `${menu.weeks[index % menu.weeks.length].displayName}`,
      start: range.start.toISOString().split('T')[0],
      end: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.addDays)(range.end, 1).toISOString().split('T')[0],
      backgroundColor: colors[index % menu.weeks.length],
      borderColor: colors[index % menu.weeks.length]
    }));
    const calendarOptions = {
      plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_3__["default"]],
      initialView: 'dayGridMonth',
      events: events,
      firstDay: 1,
      locale: _fullcalendar_core_locales_ru__WEBPACK_IMPORTED_MODULE_4__["default"]
    };
    return calendarOptions;
  }
  getCurrentDateWeekString(menu) {
    const formattedDate = new Date().toLocaleDateString('ru', {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    const currentWeek = this.getCurrentWeek(menu.weeks.length);
    const currentWeekDisplayName = menu.weeks.find(menu => menu.name === currentWeek).displayName;
    return `Сегодня ${formattedDate} ${currentWeekDisplayName}`;
  }
}, _WeekService.ctorParameters = () => [], _WeekService);
WeekService = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
  providedIn: 'root'
}), __metadata("design:paramtypes", [])], WeekService);


/***/ }),

/***/ 4183:
/*!**********************************************************************!*\
  !*** ./src/app/home/components/admin-panel/admin-panel.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPanelComponent: () => (/* binding */ AdminPanelComponent)
/* harmony export */ });
/* harmony import */ var _admin_panel_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-panel.component.html?ngResource */ 2677);
/* harmony import */ var _admin_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-panel.component.scss?ngResource */ 2659);
/* harmony import */ var _admin_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_admin_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 6042);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 3617);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 1870);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 6301);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 1995);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 5842);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 1567);
/* harmony import */ var _models_employee_menu_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/employee-menu.model */ 3554);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/services/firebase-data.service */ 7508);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/api */ 7780);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngneat/until-destroy */ 6127);
/* harmony import */ var _models_employee_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../models/employee.model */ 3162);
/* harmony import */ var _helpers_service_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helpers/service.helper */ 9133);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/dynamicdialog */ 5079);
/* harmony import */ var _components_personal_menu_personal_menu_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/personal-menu/personal-menu.component */ 1178);
var _AdminPanelComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














let AdminPanelComponent = (_AdminPanelComponent = class AdminPanelComponent {
  constructor(authService, fbService, messageService, confirmationService, dialogService) {
    this.authService = authService;
    this.fbService = fbService;
    this.messageService = messageService;
    this.confirmationService = confirmationService;
    this.dialogService = dialogService;
    this.isLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.BehaviorSubject(false);
    //Personal menu management
    this.saveUserMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.refreshUserMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    //General menu management
    this.saveGeneralMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.refreshGeneralMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.selectedDishesWithDay$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.ReplaySubject(1);
    //Users management
    this.addNewUser$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.refreshEmployees$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.removeUser$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.editUser$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.editSelectedUserMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.changeUserPassword$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    //Weeks management
    this.addNewWeek$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.removeWeek$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.renameWeek$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    //oth
    this.errorSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.ReplaySubject(1);
    this._selectedTabIndex = 0;
  }
  ngOnInit() {
    this.employees$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.merge)(this.employeesData$, this.refreshEmployees$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(_ => this.employeesData$))).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При списка сотрудников произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }));
    this.generalMenu$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.merge)(this.generalMenuData$, this.refreshGeneralMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(_ => this.generalMenuData$)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При получении основного меню произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }))).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.share)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.shareReplay)({
      refCount: true,
      bufferSize: 1
    }));
    this.initializeSideEffect();
  }
  initializeSideEffect() {
    this.saveUserMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(menu => this.fbService.updateItem('menus', menu.id, menu)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При сохранении меню произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Изменения успешно сохранены'
      });
      this.refreshUserMenu$.next();
    });
    this.saveGeneralMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(menu => this.fbService.updateItem('generalMenu', 1, menu)), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(_ => this.userMenus$), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.selectedDishesWithDay$), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(([menus, selectedDishes]) => {
      const filterCourses = selectedDishes.dishes.map(dish => dish);
      const updatedMenus = menus.map(employeeMenu => {
        const currentWeek = employeeMenu.weeks[selectedDishes.week];
        const currentDay = currentWeek.days.find(day => day.name === selectedDishes.day);
        if (!filterCourses.includes(currentDay.meals[selectedDishes.dishType])) {
          currentDay.meals[selectedDishes.dishType] = "";
        }
        return employeeMenu;
      });
      return this.fbService.updateAllItems('menus', updatedMenus);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: err
      });
      this.errorSubject$.next({
        error: true,
        timestamp: new Date().getTime()
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Изменения успешно сохранены'
      });
      this.refreshGeneralMenu$.next();
      this.refreshUserMenu$.next();
    });
    //Users management
    this.addNewUser$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(userDto => {
      const employee = new _models_employee_model__WEBPACK_IMPORTED_MODULE_5__.Employee({
        username: userDto.username,
        fullName: userDto.fullName,
        role: userDto.role
      });
      this.isLoading$.next(true);
      return this.authService.createUser(userDto.username, userDto.password, employee);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.isLoading$.next(false);
      this.messageService.add({
        severity: 'error',
        detail: _helpers_service_helper__WEBPACK_IMPORTED_MODULE_6__.ServiceHelper.translateError(err.code)
      });
      this.errorSubject$.next({
        error: true,
        timestamp: new Date().getTime()
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(res => {
      this.isLoading$.next(false);
      this.messageService.add({
        severity: 'success',
        detail: 'Новый сотрудник успешно добавлен'
      });
      this.refreshEmployees$.next();
    });
    this.removeUser$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(user => {
      const confirmed$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
      this.confirmationService.confirm({
        header: "Удаление пользователя",
        message: `Вы действительно хотите удалить пользователя ${user.fullName} ?`,
        rejectLabel: "Отмена",
        acceptLabel: "Удалить",
        acceptButtonStyleClass: "p-button-primary",
        rejectButtonStyleClass: "p-button-secondary p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",
        blockScroll: false,
        accept: () => {
          this.isLoading$.next(true);
          confirmed$.next(true);
        },
        reject: () => {
          confirmed$.next(false);
          this.isLoading$.next(false);
        }
      });
      return confirmed$;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.filter)(confirmed => confirmed), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.removeUser$), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(([_, user]) => this.authService.deleteUser(user)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.isLoading$.next(false);
      this.messageService.add({
        severity: 'error',
        detail: 'При удалении сотрудника произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.isLoading$.next(false);
      this.messageService.add({
        severity: 'success',
        detail: 'Cотрудник успешно удален'
      });
      this.refreshEmployees$.next();
    });
    this.editUser$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(user => this.fbService.updateItem('employees', user.id, user)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При изменении данных пользователя, произошла ошибка.'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Данные пользователя успешно сохранены'
      });
      this.refreshEmployees$.next();
    });
    this.editSelectedUserMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(id => this.fbService.getItemById('menus', id)), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.generalMenu$), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(([menu, generalMenu]) => {
      this.ref = this.dialogService.open(_components_personal_menu_personal_menu_component__WEBPACK_IMPORTED_MODULE_7__.PersonalMenuComponent, {
        width: '95%',
        height: '95%',
        data: {
          userMenuData: menu,
          generalMenu: generalMenu
        }
      });
      return this.ref.onClose;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.filter)(menu => !(0,lodash_es__WEBPACK_IMPORTED_MODULE_21__["default"])(menu)), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(menu => this.fbService.updateItem('menus', menu.id, menu)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: err
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => this.messageService.add({
      severity: 'success',
      detail: 'Изменения успешно сохранены'
    }));
    this.changeUserPassword$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(data => this.authService.updatePassword(data.id, data.password)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: err.code
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => this.messageService.add({
      severity: 'success',
      detail: 'пароль успешно изменен'
    }));
    //Weeks management
    this.addNewWeek$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(week => {
      const newEmployeeWeek = _helpers_service_helper__WEBPACK_IMPORTED_MODULE_6__.ServiceHelper.toPlainObject(new _models_employee_menu_model__WEBPACK_IMPORTED_MODULE_2__.Week({
        name: week.name,
        displayName: week.displayName
      }));
      return this.fbService.addItemToArray('generalMenu', 'weeks', week, 'menus', newEmployeeWeek);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.errorSubject$.next({
        error: true,
        timestamp: new Date().getTime()
      });
      this.messageService.add({
        severity: 'error',
        detail: err
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Новая неделя успешно добавлена'
      });
      this.refreshGeneralMenu$.next();
    });
    this.removeWeek$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(week => {
      const confirmed$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
      this.confirmationService.confirm({
        header: "Удаление недели",
        message: `Вы действительно хотите удалить "${week.displayName}"? Все меню этой недели будет утеряно`,
        rejectLabel: "Отмена",
        acceptLabel: "Удалить",
        acceptButtonStyleClass: "p-button-primary",
        rejectButtonStyleClass: "p-button-secondary p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",
        blockScroll: false,
        accept: () => {
          this.isLoading$.next(true);
          confirmed$.next(true);
        },
        reject: () => {
          confirmed$.next(false);
          this.isLoading$.next(false);
        }
      });
      return confirmed$;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.filter)(confirmed => confirmed), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.removeWeek$), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(([_, week]) => this.fbService.removeItemFromArray('generalMenu', 'weeks', 'name', week.name, 'menus')), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(_ => this.fbService.renameArrayItems('generalMenu', 'weeks', (week, i) => ({
      ...week,
      name: `week${i + 1}`
    }), 'menus', (week, i) => ({
      ...week,
      name: `week${i + 1}`
    }))), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: err
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.isLoading$.next(false);
      this.messageService.add({
        severity: 'success',
        detail: 'Неделя успешно удалена'
      });
      this.refreshGeneralMenu$.next();
    });
    this.renameWeek$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.switchMap)(weekData => this.fbService.renameArrayItems('generalMenu', 'weeks', week => {
      if (week.name === weekData.weekName) {
        return {
          ...week,
          displayName: weekData.newDisplayName
        };
      }
      return week;
    }, 'menus', week => {
      if (week.name === weekData.weekName) {
        return {
          ...week,
          displayName: weekData.newDisplayName
        };
      }
      return week;
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.catchError)(err => {
      this.errorSubject$.next({
        error: true,
        timestamp: new Date().getTime()
      });
      this.messageService.add({
        severity: 'error',
        detail: err
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(err);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Неделя успешно переименована'
      });
      this.refreshGeneralMenu$.next();
    });
  }
  get userMenus$() {
    return this.fbService.getItems('menus');
  }
  get generalMenuData$() {
    return this.fbService.getItemById('generalMenu', 1);
  }
  get employeesData$() {
    return this.fbService.getItems('employees');
  }
}, _AdminPanelComponent.ctorParameters = () => [{
  type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService
}, {
  type: _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__.FirebaseDataService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_22__.MessageService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_22__.ConfirmationService
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_23__.DialogService
}], _AdminPanelComponent);
AdminPanelComponent = __decorate([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.UntilDestroy)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_24__.Component)({
  selector: 'app-admin-panel',
  template: _admin_panel_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_24__.ViewEncapsulation.None,
  styles: [(_admin_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService, _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__.FirebaseDataService, primeng_api__WEBPACK_IMPORTED_MODULE_22__.MessageService, primeng_api__WEBPACK_IMPORTED_MODULE_22__.ConfirmationService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_23__.DialogService])], AdminPanelComponent);


/***/ }),

/***/ 5757:
/*!*************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/menu-administration/menu-administration.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuAdministrationComponent: () => (/* binding */ MenuAdministrationComponent)
/* harmony export */ });
/* harmony import */ var _menu_administration_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-administration.component.html?ngResource */ 6479);
/* harmony import */ var _menu_administration_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-administration.component.scss?ngResource */ 4763);
/* harmony import */ var _menu_administration_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_menu_administration_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 6042);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 3617);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 6301);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 9999);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 1567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 5842);
/* harmony import */ var _models_general_menu_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../models/general-menu.model */ 4154);
/* harmony import */ var _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../consts/weeks-vocabulary */ 2403);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngneat/until-destroy */ 6127);
/* harmony import */ var _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/services/week.service */ 8740);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _form_validators_form_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../form-validators/form-validators */ 4465);
/* harmony import */ var _helpers_service_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../helpers/service.helper */ 9133);
var _MenuAdministrationComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













let MenuAdministrationComponent = (_MenuAdministrationComponent = class MenuAdministrationComponent {
  set generalMenu(menu) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(menu)) {
      this.generalMenu$.next(menu);
      this.isDialogShow = false;
      this.isNewWeekDialogShow = false;
      if (this.weekAction$.value === 'delete' && this._currentWeekIndex > 0) {
        this._currentWeekIndex = this._currentWeekIndex - 1;
      }
    }
  }
  set serviceError(error) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(error)) this.errorSubject$.next(error);
  }
  constructor(weekService, fb) {
    this.weekService = weekService;
    this.fb = fb;
    this.updateMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.changeDishesWithDay = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.addNewWeek = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.removeWeek = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.renameWeek = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter();
    this.DAYS_OF_WEEK = _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__.DAYS_OF_WEEK;
    this._currentWeekIndex = 0;
    this.generalMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.ReplaySubject(1);
    this.currentDishType$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject("firstCourse");
    this.currentWeek$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(0);
    this.selectedDay$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject("");
    this.selectedDishes$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject([]);
    this.updateMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.isDialogShow = false;
    this.isNewWeekDialogShow = false;
    this.isCalendarDialogShow = false;
    this.startLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.errorSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.ReplaySubject(1);
    //weeks management
    this.weekDisplayNameFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControl('', _form_validators_form_validators__WEBPACK_IMPORTED_MODULE_5__.noWhitespaceValidator);
    this.addNewWeekClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.removeWeekClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.renameWeekClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    this.openModalMode$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject('new');
    this.weekModalHeaderName$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject('Добавление новой недели');
    this.selectedWeekName$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject('');
    this.weekAction$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject('add');
  }
  ngOnInit() {
    this.mealsForm = this.fb.array([]);
    this.currentDate$ = this.generalMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(menu => {
      return this.weekService.getCurrentDateWeekString(menu);
    }));
    this.calendarOptions$ = this.generalMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(menu => {
      return this.weekService.getWeeksCalendarOptions(menu);
    }));
    this.modalHeaderName$ = this.currentDishType$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(type => _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__.DISHES[type]));
    this.isLoading$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.merge)(this.generalMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(_ => false)), this.startLoading$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(_ => true)), this.errorSubject$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(_ => false))).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedDishesWithDay$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([this.currentWeek$, this.selectedDay$, this.mealsForm.valueChanges, this.currentDishType$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.filter)(([week, day, dishes, dishType]) => !(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(week) && !(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(day) && !(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(dishes) && !(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(dishType)), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(([week, day, dishes, dishType]) => {
      const data = {
        week: week,
        day: day,
        dishType: dishType,
        dishes: dishes
      };
      return data;
    }));
    this.selectedOptions$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([this.generalMenu$, this.currentWeek$, this.selectedDay$, this.currentDishType$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(([menu, week, day, type]) => {
      if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(menu)) {
        var _menu$weeks$week, _menu$weeks$week2;
        const dayIndex = (_menu$weeks$week = menu.weeks[week]) === null || _menu$weeks$week === void 0 ? void 0 : _menu$weeks$week.days.findIndex(option => option.name === day);
        const dishes = (_menu$weeks$week2 = menu.weeks[week]) === null || _menu$weeks$week2 === void 0 || (_menu$weeks$week2 = _menu$weeks$week2.days[dayIndex]) === null || _menu$weeks$week2 === void 0 ? void 0 : _menu$weeks$week2.meals[type];
        return dishes;
      }
      return [];
    }));
    this.initializeSideEffects();
  }
  addMeal(value = "") {
    this.mealsForm.push(this.fb.control(value, _form_validators_form_validators__WEBPACK_IMPORTED_MODULE_5__.noWhitespaceValidator)); // Добавление нового FormControl в FormArray
  }
  removeMeal(index) {
    this.mealsForm.removeAt(index);
  }
  openModal(week, dishType) {
    this.currentWeek$.next(week);
    this.currentDishType$.next(dishType);
    this.isDialogShow = true;
  }
  initializeSideEffects() {
    this.selectedOptions$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(meals => {
      if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(meals)) {
        meals.forEach(meal => this.addMeal(meal));
      }
    });
    this.updateMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.filter)(_ => this.mealsForm.valid), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.currentWeek$, this.selectedDay$, this.currentDishType$), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(([menu, week, day, type]) => {
      const currentWeek = menu.weeks[week];
      const currentDay = currentWeek.days.find(d => d.name === day);
      if (currentDay) {
        currentDay.meals[type].push(...this.mealsForm.value);
        currentDay.meals[type] = this.mealsForm.value;
      }
      return menu;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.selectedDishesWithDay$), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(([menu, selectedMenuWithDay]) => {
      this.updateMenu.emit(menu);
      this.changeDishesWithDay.emit(selectedMenuWithDay);
      this.startLoading$.next();
      this.resetData();
    });
    //Weeks management
    this.addNewWeekClick$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.filter)(_ => this.weekDisplayNameFormControl.valid), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.withLatestFrom)(this.generalMenu$), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(([_, menu]) => {
      this.isNewWeekDialogShow = true;
      const totalWeeks = menu.weeks.length;
      return new _models_general_menu_model__WEBPACK_IMPORTED_MODULE_2__.GeneralMenuWeek({
        name: `week${totalWeeks + 1}`,
        displayName: this.weekDisplayNameFormControl.value
      });
    })).subscribe(week => {
      this.weekAction$.next('add');
      this.addNewWeek.emit(_helpers_service_helper__WEBPACK_IMPORTED_MODULE_6__.ServiceHelper.toPlainObject(week));
      this.startLoading$.next();
      this.weekDisplayNameFormControl.reset();
    });
    this.removeWeekClick$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(week => {
      this.weekAction$.next('delete');
      this.removeWeek.emit(week);
    });
    this.renameWeekClick$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(newDisplayName => {
      this.weekAction$.next('update');
      this.renameWeek.emit({
        weekName: this.selectedWeekName$.value,
        newDisplayName: newDisplayName
      });
      this.startLoading$.next();
    });
  }
  getMaxArrayLength(arr1, arr2, arr3, arr4) {
    return new Array(Math.max(arr1.length, arr2.length, arr3.length, arr4.length));
  }
  resetData() {
    this.selectedDishes$.next(null);
    this.selectedDay$.next(null);
    this.currentWeek$.next(null);
    this.currentDishType$.next(null);
    this.mealsForm = this.fb.array([]);
    this.isDialogShow = false;
  }
  openWeekModal(week) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(week)) {
      this.openModalMode$.next('edit');
      this.weekDisplayNameFormControl.setValue(week.displayName);
      this.weekModalHeaderName$.next(`Редактирование недели "${week.displayName}"`);
      this.selectedWeekName$.next(week.name);
    } else {
      this.openModalMode$.next('new');
      this.weekModalHeaderName$.next('Добавление новой недели');
    }
    this.isNewWeekDialogShow = true;
  }
  openCalendarDialog() {
    this.isCalendarDialogShow = true;
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 200);
  }
}, _MenuAdministrationComponent.ctorParameters = () => [{
  type: _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService
}, {
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder
}], _MenuAdministrationComponent.propDecorators = {
  calendarComponent: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
    args: ['calendar']
  }],
  generalMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  serviceError: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input
  }],
  updateMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Output
  }],
  changeDishesWithDay: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Output
  }],
  addNewWeek: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Output
  }],
  removeWeek: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Output
  }],
  renameWeek: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Output
  }]
}, _MenuAdministrationComponent);
MenuAdministrationComponent = __decorate([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.UntilDestroy)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-menu-administration',
  template: _menu_administration_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectionStrategy.OnPush,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewEncapsulation.None,
  styles: [(_menu_administration_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder])], MenuAdministrationComponent);


/***/ }),

/***/ 1178:
/*!*************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/personal-menu/personal-menu.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonalMenuComponent: () => (/* binding */ PersonalMenuComponent)
/* harmony export */ });
/* harmony import */ var _personal_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./personal-menu.component.html?ngResource */ 2239);
/* harmony import */ var _personal_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./personal-menu.component.scss?ngResource */ 5611);
/* harmony import */ var _personal_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_personal_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 6042);
/* harmony import */ var _models_employee_menu_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../models/employee-menu.model */ 3554);
/* harmony import */ var _models_general_menu_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../models/general-menu.model */ 4154);
/* harmony import */ var _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/services/week.service */ 8740);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es */ 5237);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash-es */ 2434);
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dynamicdialog */ 5079);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 271);
var _PersonalMenuComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let PersonalMenuComponent = (_PersonalMenuComponent = class PersonalMenuComponent {
  set userMenuData(menu) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(menu)) {
      var _this$_cachedUserMenu;
      this.currentUserMenu$.next(menu);
      !(0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(menu) ? this._cachedUserMenu = (0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(menu) : this._cachedUserMenu = null;
      (_this$_cachedUserMenu = this._cachedUserMenu) === null || _this$_cachedUserMenu === void 0 || _this$_cachedUserMenu.weeks.map(week => week.days.sort((a, b) => a.name > b.name ? 1 : -1));
    }
  }
  set generalMenu(menu) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(menu)) this.generalMenu$.next(menu);
  }
  constructor(weekService, config, ref) {
    this.weekService = weekService;
    this.config = config;
    this.ref = ref;
    this.saveMenuData = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
    this.generalMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.ReplaySubject(1);
    this.currentUserMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.ReplaySubject(1);
    if (config.data) {
      this.currentUserMenu$.next(config.data.userMenuData);
      this._cachedUserMenu = (0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(config.data.userMenuData);
      this.generalMenu$.next(config.data.generalMenu);
    }
  }
  ngOnInit() {
    this.currentDate$ = this.generalMenu$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(menu => this.weekService.getCurrentDateWeekString(menu)));
    this.currentWeek$ = this.generalMenu$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(menu => this.weekService.getCurrentWeek(menu.weeks.length)));
  }
  getBtnState(changedMenu, cachedMenu) {
    return (0,lodash_es__WEBPACK_IMPORTED_MODULE_10__["default"])(changedMenu, cachedMenu);
  }
  onSave(menu) {
    this.saveMenuData.emit(menu);
    this.ref.close(menu);
  }
  onCancel() {
    this.ref.close();
  }
}, _PersonalMenuComponent.ctorParameters = () => [{
  type: _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogConfig
}, {
  type: primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogRef
}], _PersonalMenuComponent.propDecorators = {
  userMenuData: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  generalMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input
  }],
  saveMenuData: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Output
  }]
}, _PersonalMenuComponent);
PersonalMenuComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'app-personal-menu',
  template: _personal_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_personal_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogConfig, primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__.DynamicDialogRef])], PersonalMenuComponent);


/***/ }),

/***/ 2675:
/*!*******************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/users-management/users-management.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersManagementComponent: () => (/* binding */ UsersManagementComponent)
/* harmony export */ });
/* harmony import */ var _users_management_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users-management.component.html?ngResource */ 4397);
/* harmony import */ var _users_management_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users-management.component.scss?ngResource */ 5862);
/* harmony import */ var _users_management_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_users_management_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 6042);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 3617);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 6301);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash-es */ 2434);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../form-validators/form-validators */ 4465);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _consts_roles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../consts/roles */ 3318);
/* harmony import */ var _consts_employee_status_vocabulary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../consts/employee-status-vocabulary */ 8031);
var _UsersManagementComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










let UsersManagementComponent = (_UsersManagementComponent = class UsersManagementComponent {
  set employees(employees) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(employees)) {
      employees.sort((a, b) => a.fullName.localeCompare(b.fullName));
      const filteredEmployees = employees.filter(employee => employee.id !== this.currentUserId);
      this.employees$.next(filteredEmployees);
      this.isDialogShow = false;
    }
  }
  set serviceError(error) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_5__["default"])(error)) this.errorSubject$.next(error);
  }
  constructor(fb) {
    this.fb = fb;
    this.addUser = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.removeUser = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.editUser = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.openUserMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.passwordChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.employeeStatuses = [];
    this.roles = _consts_roles__WEBPACK_IMPORTED_MODULE_3__.ROLES;
    this.STATUSES = _consts_employee_status_vocabulary__WEBPACK_IMPORTED_MODULE_4__.STATUSES;
    this.isDialogShow = false;
    this.isPasswordDialogShow = false;
    this.startLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this.errorSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.ReplaySubject(1);
    this.employees$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.ReplaySubject(1);
    this.isPasswordShow = false;
    this.newPasswordControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(6)]);
    this.repeatPasswordControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator);
    this.selectedUserId = "";
    this.currentUserId = JSON.parse(localStorage.getItem("userData")).id;
    this.userFormDto = this.fb.group({
      username: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator]),
      fullName: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator]),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(6)]),
      role: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null, [_form_validators_form_validators__WEBPACK_IMPORTED_MODULE_2__.noWhitespaceValidator])
    });
    this.isLoading$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.merge)(this.employees$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(_ => false)), this.startLoading$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(_ => true)), this.errorSubject$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(_ => false))).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.shareReplay)({
      bufferSize: 1,
      refCount: true
    }));
    this.employeeStatuses = Object.keys(_consts_employee_status_vocabulary__WEBPACK_IMPORTED_MODULE_4__.STATUSES).map(key => ({
      label: _consts_employee_status_vocabulary__WEBPACK_IMPORTED_MODULE_4__.STATUSES[key],
      value: key
    }));
  }
  showModal() {
    this.isDialogShow = true;
  }
  getErrorMessage(control) {
    const errors = control.errors;
    if (errors && control.dirty) {
      switch (true) {
        case !!errors['whitespace']:
          return 'Поле обязательно для заполнения';
        case !!errors['invalidEmail']:
          return 'Логин должен быть в формате email';
        case !!errors['minlength']:
          return 'Пароль должен быть не менее 6 символов';
        default:
          return "";
      }
    }
    return "";
  }
  sendForm() {
    if (this.userFormDto.invalid) {
      for (const control in this.userFormDto.controls) {
        var _this$userFormDto$get;
        (_this$userFormDto$get = this.userFormDto.get(control)) === null || _this$userFormDto$get === void 0 || _this$userFormDto$get.markAsDirty();
      }
      return;
    }
    const sendData = this.userFormDto.value;
    sendData.username = sendData.username.concat('@fondital.ru');
    this.startLoading$.next();
    this.addUser.emit(sendData);
  }
  resetForm() {
    this.userFormDto.reset();
  }
  togglePassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }
  openPasswordModal(id) {
    this.selectedUserId = id;
    this.isPasswordDialogShow = true;
  }
  changePassword() {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_13__["default"])(this.newPasswordControl.value, this.repeatPasswordControl.value)) {
      this.repeatPasswordControl.markAsDirty();
      return;
    }
    this.passwordChange.emit({
      id: this.selectedUserId,
      password: this.repeatPasswordControl.value
    });
    this.isPasswordDialogShow = false;
  }
}, _UsersManagementComponent.ctorParameters = () => [{
  type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder
}], _UsersManagementComponent.propDecorators = {
  employees: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input
  }],
  serviceError: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Input
  }],
  addUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Output
  }],
  removeUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Output
  }],
  editUser: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Output
  }],
  openUserMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Output
  }],
  passwordChange: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Output
  }]
}, _UsersManagementComponent);
UsersManagementComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-users-management',
  template: _users_management_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ViewEncapsulation.None,
  styles: [(_users_management_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder])], UsersManagementComponent);


/***/ }),

/***/ 524:
/*!**********************************************************************!*\
  !*** ./src/app/home/components/dining-info/dining-info.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiningInfoComponent: () => (/* binding */ DiningInfoComponent)
/* harmony export */ });
/* harmony import */ var _dining_info_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dining-info.component.html?ngResource */ 3485);
/* harmony import */ var _dining_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dining-info.component.scss?ngResource */ 1803);
/* harmony import */ var _dining_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dining_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_week_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/week.service */ 8740);
/* harmony import */ var _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../consts/weeks-vocabulary */ 2403);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 5842);
/* harmony import */ var _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/services/firebase-data.service */ 7508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _functions_calculateMealsCount_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions/calculateMealsCount.function */ 3653);
var _DiningInfoComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let DiningInfoComponent = (_DiningInfoComponent = class DiningInfoComponent {
  constructor(weekService, fbService) {
    this.weekService = weekService;
    this.fbService = fbService;
    this.Object = Object;
    this._currentDayIndex = 0;
    this.currentDate = new Date();
  }
  ngOnInit() {
    this.employees$ = this.fbService.getItems('employees');
    this.employeeMenus$ = this.fbService.getItems('menus').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.withLatestFrom)(this.employees$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(([menus, employees]) => {
      const filteredMenus = menus.filter(menu => {
        const employee = employees.find(employee => employee.id === menu.id);
        return employee && employee.status !== 'NotWorking';
      });
      return filteredMenus;
    }));
    this.diningTableData$ = this.employeeMenus$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(menus => {
      const currentDate = this.weekService.getCurrentDateWeekString(menus[0]);
      const currentWeek = this.weekService.getCurrentWeek(menus[0].weeks.length);
      const currentWeekIndex = menus[0].weeks.findIndex(week => week.name === currentWeek);
      const currentWeekDay = this.currentDate.toLocaleDateString('ru', {
        weekday: "long"
      });
      const currentDayIndex = Object.values(_consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__.DAYS_OF_WEEK).map(day => day.toLowerCase()).indexOf(currentWeekDay.toLowerCase());
      const isWeekend = currentWeekDay === "суббота" || currentWeekDay === "воскресенье";
      const mealsCount = (0,_functions_calculateMealsCount_function__WEBPACK_IMPORTED_MODULE_5__.calculateMealCounts)(menus, currentWeekIndex, currentDayIndex);
      const data = {
        menus: menus,
        currentDate: currentDate,
        weekIndex: currentWeekIndex,
        dayIndex: currentDayIndex,
        isWeekend: isWeekend,
        mealCounts: mealsCount
      };
      return data;
    }));
  }
  getMaxFooterRows(mealCounts) {
    return Array.from({
      length: Math.max(Object.keys(mealCounts.firstCourse).length - 1, Object.keys(mealCounts.secondCourse).length - 1, Object.keys(mealCounts.sideDish).length - 1, Object.keys(mealCounts.salad).length - 1)
    });
  }
}, _DiningInfoComponent.ctorParameters = () => [{
  type: _core_services_week_service__WEBPACK_IMPORTED_MODULE_2__.WeekService
}, {
  type: _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__.FirebaseDataService
}], _DiningInfoComponent);
DiningInfoComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-dining-info',
  template: _dining_info_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewEncapsulation.None,
  styles: [(_dining_info_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_week_service__WEBPACK_IMPORTED_MODULE_2__.WeekService, _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_4__.FirebaseDataService])], DiningInfoComponent);


/***/ }),

/***/ 3653:
/*!***************************************************************************************!*\
  !*** ./src/app/home/components/dining-info/functions/calculateMealsCount.function.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateMealCounts: () => (/* binding */ calculateMealCounts)
/* harmony export */ });
function calculateMealCounts(data, currentWeekIndex, currentDayIndex) {
  const mealCounts = {
    firstCourse: {
      total: 0
    },
    salad: {
      total: 0
    },
    sideDish: {
      total: 0
    },
    secondCourse: {
      total: 0
    }
  };
  data.forEach(employee => {
    const week = employee.weeks[currentWeekIndex];
    if (week) {
      const day = week.days[currentDayIndex];
      if (day) {
        const meals = day.meals;
        if (meals.firstCourse) {
          if (!mealCounts.firstCourse[meals.firstCourse]) {
            mealCounts.firstCourse[meals.firstCourse] = 0;
          }
          mealCounts.firstCourse[meals.firstCourse]++;
          mealCounts.firstCourse.total++;
        }
        if (meals.salad) {
          if (!mealCounts.salad[meals.salad]) {
            mealCounts.salad[meals.salad] = 0;
          }
          mealCounts.salad[meals.salad]++;
          mealCounts.salad.total++;
        }
        if (meals.sideDish) {
          if (!mealCounts.sideDish[meals.sideDish]) {
            mealCounts.sideDish[meals.sideDish] = 0;
          }
          mealCounts.sideDish[meals.sideDish]++;
          mealCounts.sideDish.total++;
        }
        if (meals.secondCourse) {
          if (!mealCounts.secondCourse[meals.secondCourse]) {
            mealCounts.secondCourse[meals.secondCourse] = 0;
          }
          mealCounts.secondCourse[meals.secondCourse]++;
          mealCounts.secondCourse.total++;
        }
      }
    }
  });
  const totalComplexMeals = Math.max(mealCounts.firstCourse.total, mealCounts.salad.total, mealCounts.sideDish.total, mealCounts.secondCourse.total);
  mealCounts.complexMeals = {
    total: totalComplexMeals
  };
  return mealCounts;
}

/***/ }),

/***/ 3910:
/*!***************************************************************************************************!*\
  !*** ./src/app/home/components/user-menu/components/user-menu-table/user-menu-table.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserMenuTableComponent: () => (/* binding */ UserMenuTableComponent)
/* harmony export */ });
/* harmony import */ var _user_menu_table_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-menu-table.component.html?ngResource */ 9074);
/* harmony import */ var _user_menu_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-menu-table.component.scss?ngResource */ 1226);
/* harmony import */ var _user_menu_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user_menu_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _models_general_menu_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../models/general-menu.model */ 4154);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6042);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../consts/weeks-vocabulary */ 2403);
var _UserMenuTableComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let UserMenuTableComponent = (_UserMenuTableComponent = class UserMenuTableComponent {
  constructor() {
    this.changeMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    this.DAYS_OF_WEEK = _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__.DAYS_OF_WEEK;
    this.WEEKS = _consts_weeks_vocabulary__WEBPACK_IMPORTED_MODULE_3__.WEEKS;
    this.weeks$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.ReplaySubject(1);
    this.generalMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.ReplaySubject(1);
    this._currentWeekIndex = 0;
    this._currentDate = new Date();
    this._currentDay = this._currentDate.toLocaleDateString('ru', {
      weekday: "long"
    });
    this._currentTimeInvalid = this._currentDate.getHours() > 15 || this._currentDate.getHours() === 15 && this._currentDate.getMinutes() > 0;
  }
  set weeks(weeks) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(weeks)) this.weeks$.next(weeks);else this.weeks$.next([]);
  }
  set generalMenu(menu) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(menu)) this.generalMenu$.next(menu);
  }
  set currentWeek(week) {
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_6__["default"])(week)) {
      this._currentWeek = week;
      console.log(this._currentDay, week, this._currentTimeInvalid);
    }
  }
  ngOnInit() {}
  onSaladChange(weekDay, newValue) {
    if (newValue === 'САЛАТ') {
      weekDay.meals.firstCourse = '';
      weekDay.meals.secondCourse = '';
      weekDay.meals.sideDish = '';
    }
  }
}, _UserMenuTableComponent.propDecorators = {
  weeks: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  generalMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  currentWeek: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input
  }],
  changeMenu: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Output
  }]
}, _UserMenuTableComponent);
UserMenuTableComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
  selector: 'app-user-menu-table',
  template: _user_menu_table_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_4__.ViewEncapsulation.None,
  styles: [(_user_menu_table_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], UserMenuTableComponent);


/***/ }),

/***/ 5555:
/*!******************************************************************!*\
  !*** ./src/app/home/components/user-menu/user-menu.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserMenuComponent: () => (/* binding */ UserMenuComponent)
/* harmony export */ });
/* harmony import */ var _user_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-menu.component.html?ngResource */ 609);
/* harmony import */ var _user_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-menu.component.scss?ngResource */ 7463);
/* harmony import */ var _user_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_user_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/services/firebase-data.service */ 7508);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 8764);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 3617);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 1870);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 6301);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es */ 1261);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash-es */ 5237);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lodash-es */ 2434);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngneat/until-destroy */ 6127);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/api */ 7780);
/* harmony import */ var _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/services/week.service */ 8740);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 271);
var _UserMenuComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let UserMenuComponent = (_UserMenuComponent = class UserMenuComponent {
  constructor(authService, fbService, messageService, weekService) {
    this.authService = authService;
    this.fbService = fbService;
    this.messageService = messageService;
    this.weekService = weekService;
    this.isCalendarDialogShow = false;
    this.saveMenuBtnClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.refreshUserMenu$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
  }
  ngOnInit() {
    this.userMenuData$ = this.authService.userUid.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(uid => {
      if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(uid)) {
        return this.fbService.getItemById('menus', uid);
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(null);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При получении меню сотрудника произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(err);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.tap)(menu => {
      var _this$_cachedUserMenu;
      !(0,lodash_es__WEBPACK_IMPORTED_MODULE_7__["default"])(menu) ? this._cachedUserMenu = (0,lodash_es__WEBPACK_IMPORTED_MODULE_12__["default"])(menu) : this._cachedUserMenu = null;
      (_this$_cachedUserMenu = this._cachedUserMenu) === null || _this$_cachedUserMenu === void 0 || _this$_cachedUserMenu.weeks.map(week => week.days.sort((a, b) => a.name > b.name ? 1 : -1));
    }));
    this.currentUserMenu$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.merge)(this.userMenuData$, this.refreshUserMenu$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(_ => this.userMenuData$)));
    this.generalMenu$ = this.fbService.getItemById('generalMenu', 1).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(err => {
      console.log(err);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(err);
    })).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.share)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)({
      refCount: true,
      bufferSize: 1
    }));
    this.currentDate$ = this.generalMenu$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(menu => this.weekService.getCurrentDateWeekString(menu)));
    this.currentWeek$ = this.generalMenu$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(menu => this.weekService.getCurrentWeek(menu.weeks.length)));
    this.calendarOptions$ = this.generalMenu$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(menu => {
      return this.weekService.getWeeksCalendarOptions(menu);
    }));
    this.initializeSideEffect();
  }
  getBtnState(changedMenu, cachedMenu) {
    return (0,lodash_es__WEBPACK_IMPORTED_MODULE_17__["default"])(changedMenu, cachedMenu);
  }
  openCalendarDialog() {
    this.isCalendarDialogShow = true;
    setTimeout(() => {
      this.calendarComponent.getApi().updateSize();
    }, 200);
  }
  initializeSideEffect() {
    this.saveMenuBtnClick$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.switchMap)(menu => this.fbService.updateItem('menus', menu.id, menu)), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(err => {
      this.messageService.add({
        severity: 'error',
        detail: 'При сохранении меню произошла ошибка'
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(err);
    }), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.untilDestroyed)(this)).subscribe(_ => {
      this.messageService.add({
        severity: 'success',
        detail: 'Изменения успешно сохранены'
      });
      this.refreshUserMenu$.next();
    });
  }
}, _UserMenuComponent.ctorParameters = () => [{
  type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_3__.FirebaseDataService
}, {
  type: primeng_api__WEBPACK_IMPORTED_MODULE_19__.MessageService
}, {
  type: _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService
}], _UserMenuComponent.propDecorators = {
  calendarComponent: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild,
    args: ['calendar']
  }]
}, _UserMenuComponent);
UserMenuComponent = __decorate([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_18__.UntilDestroy)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_20__.Component)({
  selector: 'app-user-menu',
  template: _user_menu_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewEncapsulation.None,
  styles: [(_user_menu_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService, _core_services_firebase_data_service__WEBPACK_IMPORTED_MODULE_3__.FirebaseDataService, primeng_api__WEBPACK_IMPORTED_MODULE_19__.MessageService, _core_services_week_service__WEBPACK_IMPORTED_MODULE_4__.WeekService])], UserMenuComponent);


/***/ }),

/***/ 630:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeRoutingModule: () => (/* binding */ HomeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ 7824);
/* harmony import */ var _components_user_menu_user_menu_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user-menu/user-menu.component */ 5555);
/* harmony import */ var _components_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/admin-panel/admin-panel.component */ 4183);
/* harmony import */ var _components_dining_info_dining_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/dining-info/dining-info.component */ 524);
/* harmony import */ var _auth_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth/guards/auth.guard */ 9615);
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







const routes = [{
  path: '',
  component: _home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent,
  children: [{
    path: 'user',
    component: _components_user_menu_user_menu_component__WEBPACK_IMPORTED_MODULE_1__.UserMenuComponent,
    canDeactivate: [_auth_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__.authGuardDeactivate]
  }, {
    path: 'admin',
    component: _components_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_2__.AdminPanelComponent,
    canDeactivate: [_auth_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__.authGuardDeactivate]
  }, {
    path: 'dining',
    component: _components_dining_info_dining_info_component__WEBPACK_IMPORTED_MODULE_3__.DiningInfoComponent,
    canDeactivate: [_auth_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__.authGuardDeactivate]
  }]
}];
let HomeRoutingModule = class HomeRoutingModule {};
HomeRoutingModule = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
})], HomeRoutingModule);


/***/ }),

/***/ 7824:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component.html?ngResource */ 1144);
/* harmony import */ var _home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.component.scss?ngResource */ 182);
/* harmony import */ var _home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let HomeComponent = class HomeComponent {};
HomeComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: 'app-home',
  template: _home_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_home_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], HomeComponent);


/***/ }),

/***/ 5055:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeModule: () => (/* binding */ HomeModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ 7824);
/* harmony import */ var _components_user_menu_user_menu_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/user-menu/user-menu.component */ 5555);
/* harmony import */ var _components_dining_info_dining_info_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dining-info/dining-info.component */ 524);
/* harmony import */ var _components_user_menu_components_user_menu_table_user_menu_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/user-menu/components/user-menu-table/user-menu-table.component */ 3910);
/* harmony import */ var _shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/toolbar/toolbar.component */ 565);
/* harmony import */ var _shared_components_loading_screen_loading_screen_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/loading-screen/loading-screen.component */ 5141);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ 630);
/* harmony import */ var _components_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/admin-panel/admin-panel.component */ 4183);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/shared.module */ 3887);
/* harmony import */ var _components_admin_panel_components_personal_menu_personal_menu_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/admin-panel/components/personal-menu/personal-menu.component */ 1178);
/* harmony import */ var _components_admin_panel_components_menu_administration_menu_administration_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/admin-panel/components/menu-administration/menu-administration.component */ 5757);
/* harmony import */ var _components_admin_panel_components_users_management_users_management_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/admin-panel/components/users-management/users-management.component */ 2675);
/* harmony import */ var _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @fullcalendar/angular */ 7997);
/* harmony import */ var _shared_directives_only_number_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/directives/only-number.directive */ 2910);
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















let HomeModule = class HomeModule {};
HomeModule = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgModule)({
  declarations: [_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent, _components_user_menu_user_menu_component__WEBPACK_IMPORTED_MODULE_1__.UserMenuComponent, _components_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_7__.AdminPanelComponent, _components_dining_info_dining_info_component__WEBPACK_IMPORTED_MODULE_2__.DiningInfoComponent, _components_user_menu_components_user_menu_table_user_menu_table_component__WEBPACK_IMPORTED_MODULE_3__.UserMenuTableComponent, _shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_4__.ToolbarComponent, _shared_components_loading_screen_loading_screen_component__WEBPACK_IMPORTED_MODULE_5__.LoadingScreenComponent, _components_admin_panel_components_personal_menu_personal_menu_component__WEBPACK_IMPORTED_MODULE_9__.PersonalMenuComponent, _components_admin_panel_components_menu_administration_menu_administration_component__WEBPACK_IMPORTED_MODULE_10__.MenuAdministrationComponent, _components_admin_panel_components_users_management_users_management_component__WEBPACK_IMPORTED_MODULE_11__.UsersManagementComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_6__.HomeRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__.SharedModule, _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_15__.FullCalendarModule, _shared_directives_only_number_directive__WEBPACK_IMPORTED_MODULE_12__.OnlyNumberDirective]
})], HomeModule);


/***/ }),

/***/ 3162:
/*!******************************************!*\
  !*** ./src/app/models/employee.model.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Employee: () => (/* binding */ Employee)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ 1261);

class Employee {
  constructor(input) {
    this.id = '';
    this.username = "";
    this.fullName = '';
    this.role = 'User';
    this.status = 'Working';
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(input)) Object.assign(this, input);
  }
}

/***/ }),

/***/ 4154:
/*!**********************************************!*\
  !*** ./src/app/models/general-menu.model.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralMenu: () => (/* binding */ GeneralMenu),
/* harmony export */   GeneralMenuDay: () => (/* binding */ GeneralMenuDay),
/* harmony export */   GeneralMenuMeal: () => (/* binding */ GeneralMenuMeal),
/* harmony export */   GeneralMenuWeek: () => (/* binding */ GeneralMenuWeek)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ 1261);

class GeneralMenu {
  constructor(input) {
    this.weeks = [new GeneralMenuWeek({
      name: "week1",
      displayName: "Неделя 1"
    })];
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(input)) Object.assign(this, input);
  }
}
class GeneralMenuMeal {
  constructor(input) {
    this.firstCourse = [];
    this.secondCourse = [];
    this.sideDish = [];
    this.salad = [];
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(input)) Object.assign(this, input);
  }
}
class GeneralMenuDay {
  constructor(input) {
    this.name = "";
    this.displayName = "";
    this.meals = new GeneralMenuMeal();
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(input)) Object.assign(this, input);
  }
}
class GeneralMenuWeek {
  constructor(input) {
    this.name = "";
    this.displayName = "";
    this.days = [new GeneralMenuDay({
      name: "day1",
      displayName: "Понедельник"
    }), new GeneralMenuDay({
      name: "day2",
      displayName: "Вторник"
    }), new GeneralMenuDay({
      name: "day3",
      displayName: "Среда"
    }), new GeneralMenuDay({
      name: "day4",
      displayName: "Четверг"
    }), new GeneralMenuDay({
      name: "day5",
      displayName: "Пятница"
    })];
    if (!(0,lodash_es__WEBPACK_IMPORTED_MODULE_0__["default"])(input)) Object.assign(this, input);
  }
}

/***/ }),

/***/ 5141:
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/loading-screen/loading-screen.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingScreenComponent: () => (/* binding */ LoadingScreenComponent)
/* harmony export */ });
/* harmony import */ var _loading_screen_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading-screen.component.html?ngResource */ 9751);
/* harmony import */ var _loading_screen_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading-screen.component.scss?ngResource */ 8241);
/* harmony import */ var _loading_screen_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_loading_screen_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let LoadingScreenComponent = class LoadingScreenComponent {};
LoadingScreenComponent = __decorate([(0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
  selector: 'app-loading-screen',
  template: _loading_screen_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_loading_screen_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], LoadingScreenComponent);


/***/ }),

/***/ 565:
/*!****************************************************************!*\
  !*** ./src/app/shared/components/toolbar/toolbar.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolbarComponent: () => (/* binding */ ToolbarComponent)
/* harmony export */ });
/* harmony import */ var _toolbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbar.component.html?ngResource */ 7367);
/* harmony import */ var _toolbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.component.scss?ngResource */ 1377);
/* harmony import */ var _toolbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_toolbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 1995);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/services/auth.service */ 8010);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngneat/until-destroy */ 6127);
var _ToolbarComponent;
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let ToolbarComponent = (_ToolbarComponent = class ToolbarComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.logout$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
  }
  ngOnInit() {
    this.logout$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(_ => this.authService.signOut().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      console.error('Login error:', error);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(error);
    }))), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.retry)(), (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_8__.untilDestroyed)(this)).subscribe(_ => {
      this.router.navigate(['/auth']);
      console.log('logout');
    });
  }
}, _ToolbarComponent.ctorParameters = () => [{
  type: _core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService
}, {
  type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router
}], _ToolbarComponent);
ToolbarComponent = __decorate([(0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_8__.UntilDestroy)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
  selector: 'app-toolbar',
  template: _toolbar_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_toolbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
}), __metadata("design:paramtypes", [_core_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService, _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router])], ToolbarComponent);


/***/ }),

/***/ 174:
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Children: () => (/* binding */ O),
/* harmony export */   Component: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   Fragment: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   PureComponent: () => (/* binding */ w),
/* harmony export */   StrictMode: () => (/* binding */ vn),
/* harmony export */   Suspense: () => (/* binding */ D),
/* harmony export */   SuspenseList: () => (/* binding */ V),
/* harmony export */   __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => (/* binding */ rn),
/* harmony export */   cloneElement: () => (/* binding */ cn),
/* harmony export */   createContext: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   createElement: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createElement),
/* harmony export */   createFactory: () => (/* binding */ on),
/* harmony export */   createPortal: () => (/* binding */ j),
/* harmony export */   createRef: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createRef),
/* harmony export */   "default": () => (/* binding */ bn),
/* harmony export */   findDOMNode: () => (/* binding */ an),
/* harmony export */   flushSync: () => (/* binding */ hn),
/* harmony export */   forwardRef: () => (/* binding */ k),
/* harmony export */   hydrate: () => (/* binding */ q),
/* harmony export */   isValidElement: () => (/* binding */ ln),
/* harmony export */   lazy: () => (/* binding */ M),
/* harmony export */   memo: () => (/* binding */ R),
/* harmony export */   render: () => (/* binding */ Y),
/* harmony export */   startTransition: () => (/* binding */ dn),
/* harmony export */   unmountComponentAtNode: () => (/* binding */ fn),
/* harmony export */   unstable_batchedUpdates: () => (/* binding */ sn),
/* harmony export */   useCallback: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback),
/* harmony export */   useContext: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext),
/* harmony export */   useDebugValue: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue),
/* harmony export */   useDeferredValue: () => (/* binding */ pn),
/* harmony export */   useEffect: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect),
/* harmony export */   useErrorBoundary: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useErrorBoundary),
/* harmony export */   useId: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId),
/* harmony export */   useImperativeHandle: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle),
/* harmony export */   useInsertionEffect: () => (/* binding */ yn),
/* harmony export */   useLayoutEffect: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect),
/* harmony export */   useMemo: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo),
/* harmony export */   useReducer: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer),
/* harmony export */   useRef: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef),
/* harmony export */   useState: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState),
/* harmony export */   useSyncExternalStore: () => (/* binding */ _n),
/* harmony export */   useTransition: () => (/* binding */ mn),
/* harmony export */   version: () => (/* binding */ un)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 8048);
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ 6734);




function g(n, t) {
  for (var e in t) n[e] = t[e];
  return n;
}
function C(n, t) {
  for (var e in n) if ("__source" !== e && !(e in t)) return !0;
  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
  return !1;
}
function E(n, t) {
  return n === t && (0 !== n || 1 / n == 1 / t) || n != n && t != t;
}
function w(n) {
  this.props = n;
}
function R(n, e) {
  function r(n) {
    var t = this.props.ref,
      r = t == n.ref;
    return !r && t && (t.call ? t(null) : t.current = null), e ? !e(this.props, n) || !r : C(this.props, n);
  }
  function u(e) {
    return this.shouldComponentUpdate = r, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(n, e);
  }
  return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.prototype.isReactComponent = !0, u.__f = !0, u;
}
(w.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).isPureReactComponent = !0, w.prototype.shouldComponentUpdate = function (n, t) {
  return C(this.props, n) || C(this.state, t);
};
var x = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), x && x(n);
};
var N = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function k(n) {
  function t(t) {
    var e = g({}, t);
    return delete e.ref, n(e, t.ref || null);
  }
  return t.$$typeof = N, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var A = function (n, t) {
    return null == n ? null : (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).map(t));
  },
  O = {
    map: A,
    forEach: A,
    count: function (n) {
      return n ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).length : 0;
    },
    only: function (n) {
      var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n);
      if (1 !== t.length) throw "Children.only";
      return t[0];
    },
    toArray: preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray
  },
  T = preact__WEBPACK_IMPORTED_MODULE_0__.options.__e;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__e = function (n, t, e, r) {
  if (n.then) for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
  T(n, t, e, r);
};
var I = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function L(n, t, e) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function (n) {
    "function" == typeof n.__c && n.__c();
  }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c = null), n.__k = n.__k && n.__k.map(function (n) {
    return L(n, t, e);
  })), n;
}
function U(n, t, e) {
  return n && (n.__v = null, n.__k = n.__k && n.__k.map(function (n) {
    return U(n, t, e);
  }), n.__c && n.__c.__P === t && (n.__e && e.insertBefore(n.__e, n.__d), n.__c.__e = !0, n.__c.__P = e)), n;
}
function D() {
  this.__u = 0, this.t = null, this.__b = null;
}
function F(n) {
  var t = n.__.__c;
  return t && t.__a && t.__a(n);
}
function M(n) {
  var e, r, u;
  function o(o) {
    if (e || (e = n()).then(function (n) {
      r = n.default || n;
    }, function (n) {
      u = n;
    }), u) throw u;
    if (!r) throw e;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(r, o);
  }
  return o.displayName = "Lazy", o.__f = !0, o;
}
function V() {
  this.u = null, this.o = null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (n) {
  var t = n.__c;
  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), I && I(n);
}, (D.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__c = function (n, t) {
  var e = t.__c,
    r = this;
  null == r.t && (r.t = []), r.t.push(e);
  var u = F(r.__v),
    o = !1,
    i = function () {
      o || (o = !0, e.__R = null, u ? u(l) : l());
    };
  e.__R = i;
  var l = function () {
      if (! --r.__u) {
        if (r.state.__a) {
          var n = r.state.__a;
          r.__v.__k[0] = U(n, n.__c.__P, n.__c.__O);
        }
        var t;
        for (r.setState({
          __a: r.__b = null
        }); t = r.t.pop();) t.forceUpdate();
      }
    },
    c = !0 === t.__h;
  r.__u++ || c || r.setState({
    __a: r.__b = r.__v.__k[0]
  }), n.then(i, i);
}, D.prototype.componentWillUnmount = function () {
  this.t = [];
}, D.prototype.render = function (n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var r = document.createElement("div"),
        o = this.__v.__k[0].__c;
      this.__v.__k[0] = L(this.__b, r, o.__O = o.__P);
    }
    this.__b = null;
  }
  var i = e.__a && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, n.fallback);
  return i && (i.__h = null), [(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, e.__a ? null : n.children), i];
};
var W = function (n, t, e) {
  if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
    for (; e.length > 3;) e.pop()();
    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};
function P(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}
function $(n) {
  var e = this,
    r = n.i;
  e.componentWillUnmount = function () {
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== r && e.componentWillUnmount(), n.__v ? (e.l || (e.i = r, e.l = {
    nodeType: 1,
    parentNode: r,
    childNodes: [],
    appendChild: function (n) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    insertBefore: function (n, t) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    removeChild: function (n) {
      this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.i.removeChild(n);
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(P, {
    context: e.context
  }, n.__v), e.l)) : e.l && e.componentWillUnmount();
}
function j(n, e) {
  var r = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)($, {
    __v: n,
    i: e
  });
  return r.containerInfo = e, r;
}
(V.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__a = function (n) {
  var t = this,
    e = F(t.__v),
    r = t.o.get(n);
  return r[0]++, function (u) {
    var o = function () {
      t.props.revealOrder ? (r.push(u), W(t, n, r)) : u();
    };
    e ? e(o) : o();
  };
}, V.prototype.render = function (n) {
  this.u = null, this.o = new Map();
  var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
  for (var e = t.length; e--;) this.o.set(t[e], this.u = [1, 0, this.u]);
  return n.children;
}, V.prototype.componentDidUpdate = V.prototype.componentDidMount = function () {
  var n = this;
  this.o.forEach(function (t, e) {
    W(n, e, t);
  });
};
var z = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
  B = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
  H = "undefined" != typeof document,
  Z = function (n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
  };
function Y(n, t, e) {
  return null == t.__k && (t.textContent = ""), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function q(n, t, e) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.hydrate)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (t) {
  Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype, t, {
    configurable: !0,
    get: function () {
      return this["UNSAFE_" + t];
    },
    set: function (n) {
      Object.defineProperty(this, t, {
        configurable: !0,
        writable: !0,
        value: n
      });
    }
  });
});
var G = preact__WEBPACK_IMPORTED_MODULE_0__.options.event;
function J() {}
function K() {
  return this.cancelBubble;
}
function Q() {
  return this.defaultPrevented;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.event = function (n) {
  return G && (n = G(n)), n.persist = J, n.isPropagationStopped = K, n.isDefaultPrevented = Q, n.nativeEvent = n;
};
var X,
  nn = {
    configurable: !0,
    get: function () {
      return this.class;
    }
  },
  tn = preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode;
preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode = function (n) {
  var t = n.type,
    e = n.props,
    u = e;
  if ("string" == typeof t) {
    var o = -1 === t.indexOf("-");
    for (var i in u = {}, e) {
      var l = e[i];
      H && "children" === i && "noscript" === t || "value" === i && "defaultValue" in e && null == l || ("defaultValue" === i && "value" in e && null == e.value ? i = "value" : "download" === i && !0 === l ? l = "" : /ondoubleclick/i.test(i) ? i = "ondblclick" : /^onchange(textarea|input)/i.test(i + t) && !Z(e.type) ? i = "oninput" : /^onfocus$/i.test(i) ? i = "onfocusin" : /^onblur$/i.test(i) ? i = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i) ? i = i.toLowerCase() : o && B.test(i) ? i = i.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l && (l = void 0), /^oninput$/i.test(i) && (i = i.toLowerCase(), u[i] && (i = "oninputCapture")), u[i] = l);
    }
    "select" == t && u.multiple && Array.isArray(u.value) && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = -1 != u.value.indexOf(n.props.value);
    })), "select" == t && null != u.defaultValue && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
    })), n.props = u, e.class != e.className && (nn.enumerable = "className" in e, null != e.className && (u.class = e.className), Object.defineProperty(u, "className", nn));
  }
  n.$$typeof = z, tn && tn(n);
};
var en = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  en && en(n), X = n.__c;
};
var rn = {
    ReactCurrentDispatcher: {
      current: {
        readContext: function (n) {
          return X.__n[n.__c].props.value;
        }
      }
    }
  },
  un = "17.0.2";
function on(n) {
  return preact__WEBPACK_IMPORTED_MODULE_0__.createElement.bind(null, n);
}
function ln(n) {
  return !!n && n.$$typeof === z;
}
function cn(n) {
  return ln(n) ? preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement.apply(null, arguments) : n;
}
function fn(n) {
  return !!n.__k && ((0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, n), !0);
}
function an(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}
var sn = function (n, t) {
    return n(t);
  },
  hn = function (n, t) {
    return n(t);
  },
  vn = preact__WEBPACK_IMPORTED_MODULE_0__.Fragment;
function dn(n) {
  n();
}
function pn(n) {
  return n;
}
function mn() {
  return [!1, dn];
}
var yn = preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect;
function _n(n, t) {
  var e = t(),
    r = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      h: {
        __: e,
        v: t
      }
    }),
    u = r[0].h,
    o = r[1];
  return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(function () {
    u.__ = e, u.v = t, E(u.__, t()) || o({
      h: u
    });
  }, [n, e, t]), (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return E(u.__, u.v()) || o({
      h: u
    }), n(function () {
      E(u.__, u.v()) || o({
        h: u
      });
    });
  }, [n]), e;
}
var bn = {
  useState: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState,
  useId: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId,
  useReducer: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer,
  useEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect,
  useLayoutEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect,
  useInsertionEffect: yn,
  useTransition: mn,
  useDeferredValue: pn,
  useSyncExternalStore: _n,
  startTransition: dn,
  useRef: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef,
  useImperativeHandle: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle,
  useMemo: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo,
  useCallback: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback,
  useContext: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext,
  useDebugValue: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue,
  version: "17.0.2",
  Children: O,
  render: Y,
  hydrate: q,
  unmountComponentAtNode: fn,
  createPortal: j,
  createElement: preact__WEBPACK_IMPORTED_MODULE_0__.createElement,
  createContext: preact__WEBPACK_IMPORTED_MODULE_0__.createContext,
  createFactory: on,
  cloneElement: cn,
  createRef: preact__WEBPACK_IMPORTED_MODULE_0__.createRef,
  Fragment: preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
  isValidElement: ln,
  findDOMNode: an,
  Component: preact__WEBPACK_IMPORTED_MODULE_0__.Component,
  PureComponent: w,
  memo: R,
  forwardRef: k,
  flushSync: hn,
  unstable_batchedUpdates: sn,
  StrictMode: vn,
  Suspense: D,
  SuspenseList: V,
  lazy: M,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: rn
};


/***/ }),

/***/ 8048:
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ x),
/* harmony export */   Fragment: () => (/* binding */ _),
/* harmony export */   cloneElement: () => (/* binding */ F),
/* harmony export */   createContext: () => (/* binding */ G),
/* harmony export */   createElement: () => (/* binding */ y),
/* harmony export */   createRef: () => (/* binding */ d),
/* harmony export */   h: () => (/* binding */ y),
/* harmony export */   hydrate: () => (/* binding */ E),
/* harmony export */   isValidElement: () => (/* binding */ i),
/* harmony export */   options: () => (/* binding */ l),
/* harmony export */   render: () => (/* binding */ D),
/* harmony export */   toChildArray: () => (/* binding */ j)
/* harmony export */ });
var n,
  l,
  u,
  i,
  t,
  r,
  o,
  f,
  e,
  c = {},
  s = [],
  a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n, l) {
  for (var u in l) n[u] = l[u];
  return n;
}
function v(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}
function y(l, u, i) {
  var t,
    r,
    o,
    f = {};
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === f[o] && (f[o] = l.defaultProps[o]);
  return p(l, f, t, r, null);
}
function p(n, i, t, r, o) {
  var f = {
    type: n,
    props: i,
    key: t,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++u : o
  };
  return null == o && null != l.vnode && l.vnode(f), f;
}
function d() {
  return {
    current: null
  };
}
function _(n) {
  return n.children;
}
function k(n, l, u, i, t) {
  var r;
  for (r in u) "children" === r || "key" === r || r in l || g(n, r, null, u[r], i);
  for (r in l) t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || g(n, r, l[r], u[r], i);
}
function b(n, l, u) {
  "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function g(n, l, u, i, t) {
  var r;
  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || b(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || b(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? w : m, r) : n.removeEventListener(l, r ? w : m, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null == u || !1 === u && -1 == l.indexOf("-") ? n.removeAttribute(l) : n.setAttribute(l, u));
  }
}
function m(n) {
  t = !0;
  try {
    return this.l[n.type + !1](l.event ? l.event(n) : n);
  } finally {
    t = !1;
  }
}
function w(n) {
  t = !0;
  try {
    return this.l[n.type + !0](l.event ? l.event(n) : n);
  } finally {
    t = !1;
  }
}
function x(n, l) {
  this.props = n, this.context = l;
}
function A(n, l) {
  if (null == l) return n.__ ? A(n.__, n.__.__k.indexOf(n) + 1) : null;
  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  return "function" == typeof n.type ? A(n) : null;
}
function P(n) {
  var l, u;
  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }
    return P(n);
  }
}
function C(n) {
  t ? setTimeout(n) : f(n);
}
function T(n) {
  (!n.__d && (n.__d = !0) && r.push(n) && !$.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || C)($);
}
function $() {
  var n, l, u, i, t, o, f, e;
  for (r.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }); n = r.shift();) n.__d && (l = r.length, i = void 0, t = void 0, f = (o = (u = n).__v).__e, (e = u.__P) && (i = [], (t = h({}, o)).__v = o.__v + 1, M(e, o, t, u.__n, void 0 !== e.ownerSVGElement, null != o.__h ? [f] : null, i, null == f ? A(o) : f, o.__h), N(i, o), o.__e != f && P(o)), r.length > l && r.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }));
  $.__r = 0;
}
function H(n, l, u, i, t, r, o, f, e, a) {
  var h,
    v,
    y,
    d,
    k,
    b,
    g,
    m = i && i.__k || s,
    w = m.length;
  for (u.__k = [], h = 0; h < l.length; h++) if (null != (d = u.__k[h] = null == (d = l[h]) || "boolean" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? p(null, d, null, null, d) : Array.isArray(d) ? p(_, {
    children: d
  }, null, null, null) : d.__b > 0 ? p(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
    if (d.__ = u, d.__b = u.__b + 1, null === (y = m[h]) || y && d.key == y.key && d.type === y.type) m[h] = void 0;else for (v = 0; v < w; v++) {
      if ((y = m[v]) && d.key == y.key && d.type === y.type) {
        m[v] = void 0;
        break;
      }
      y = null;
    }
    M(n, d, y = y || c, t, r, o, f, e, a), k = d.__e, (v = d.ref) && y.ref != v && (g || (g = []), y.ref && g.push(y.ref, null, d), g.push(v, d.__c || k, d)), null != k ? (null == b && (b = k), "function" == typeof d.type && d.__k === y.__k ? d.__d = e = I(d, e, n) : e = z(n, d, y, m, k, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = A(y));
  }
  for (u.__e = b, h = w; h--;) null != m[h] && ("function" == typeof u.type && null != m[h].__e && m[h].__e == u.__d && (u.__d = L(i).nextSibling), q(m[h], m[h]));
  if (g) for (h = 0; h < g.length; h++) S(g[h], g[++h], g[++h]);
}
function I(n, l, u) {
  for (var i, t = n.__k, r = 0; t && r < t.length; r++) (i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? I(i, l, u) : z(u, i, i, t, i.__e, l));
  return l;
}
function j(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    j(n, l);
  }) : l.push(n)), l;
}
function z(n, l, u, i, t, r) {
  var o, f, e;
  if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 1) if (f == t) break n;
    n.insertBefore(t, r), o = r;
  }
  return void 0 !== o ? o : t.nextSibling;
}
function L(n) {
  var l, u, i;
  if (null == n.type || "string" == typeof n.type) return n.__e;
  if (n.__k) for (l = n.__k.length - 1; l >= 0; l--) if ((u = n.__k[l]) && (i = L(u))) return i;
  return null;
}
function M(n, u, i, t, r, o, f, e, c) {
  var s,
    a,
    v,
    y,
    p,
    d,
    k,
    b,
    g,
    m,
    w,
    A,
    P,
    C,
    T,
    $ = u.type;
  if (void 0 !== u.constructor) return null;
  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (s = l.__b) && s(u);
  try {
    n: if ("function" == typeof $) {
      if (b = u.props, g = (s = $.contextType) && t[s.__c], m = s ? g ? g.props.value : s.__ : t, i.__c ? k = (a = u.__c = i.__c).__ = a.__E : ("prototype" in $ && $.prototype.render ? u.__c = a = new $(b, m) : (u.__c = a = new x(b, m), a.constructor = $, a.render = B), g && g.sub(a), a.props = b, a.state || (a.state = {}), a.context = m, a.__n = t, v = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != $.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, $.getDerivedStateFromProps(b, a.__s))), y = a.props, p = a.state, a.__v = u, v) null == $.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);else {
        if (null == $.getDerivedStateFromProps && b !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(b, m), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(b, a.__s, m) || u.__v === i.__v) {
          for (u.__v !== i.__v && (a.props = b, a.state = a.__s, a.__d = !1), u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), w = 0; w < a._sb.length; w++) a.__h.push(a._sb[w]);
          a._sb = [], a.__h.length && f.push(a);
          break n;
        }
        null != a.componentWillUpdate && a.componentWillUpdate(b, a.__s, m), null != a.componentDidUpdate && a.__h.push(function () {
          a.componentDidUpdate(y, p, d);
        });
      }
      if (a.context = m, a.props = b, a.__P = n, A = l.__r, P = 0, "prototype" in $ && $.prototype.render) {
        for (a.state = a.__s, a.__d = !1, A && A(u), s = a.render(a.props, a.state, a.context), C = 0; C < a._sb.length; C++) a.__h.push(a._sb[C]);
        a._sb = [];
      } else do {
        a.__d = !1, A && A(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
      } while (a.__d && ++P < 25);
      a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), v || null == a.getSnapshotBeforeUpdate || (d = a.getSnapshotBeforeUpdate(y, p)), T = null != s && s.type === _ && null == s.key ? s.props.children : s, H(n, Array.isArray(T) ? T : [T], u, i, t, r, o, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), k && (a.__E = a.__ = null), a.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = O(i.__e, u, i, t, r, o, f, c);
    (s = l.diffed) && s(u);
  } catch (n) {
    u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
  }
}
function N(n, u) {
  l.__c && l.__c(u, n), n.some(function (u) {
    try {
      n = u.__h, u.__h = [], n.some(function (n) {
        n.call(u);
      });
    } catch (n) {
      l.__e(n, u.__v);
    }
  });
}
function O(l, u, i, t, r, o, f, e) {
  var s,
    a,
    h,
    y = i.props,
    p = u.props,
    d = u.type,
    _ = 0;
  if ("svg" === d && (r = !0), null != o) for (; _ < o.length; _++) if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
    l = s, o[_] = null;
    break;
  }
  if (null == l) {
    if (null === d) return document.createTextNode(p);
    l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, e = !1;
  }
  if (null === d) y === p || e && l.data === p || (l.data = p);else {
    if (o = o && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !e) {
      if (null != o) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
      (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
    }
    if (k(l, p, y, r, e), h) u.__k = [];else if (_ = u.props.children, H(l, Array.isArray(_) ? _ : [_], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && A(i, 0), e), null != o) for (_ = o.length; _--;) null != o[_] && v(o[_]);
    e || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && g(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && g(l, "checked", _, y.checked, !1));
  }
  return l;
}
function S(n, u, i) {
  try {
    "function" == typeof n ? n(u) : n.current = u;
  } catch (n) {
    l.__e(n, i);
  }
}
function q(n, u, i) {
  var t, r;
  if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || S(t, null, u)), null != (t = n.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (n) {
      l.__e(n, u);
    }
    t.base = t.__P = null, n.__c = void 0;
  }
  if (t = n.__k) for (r = 0; r < t.length; r++) t[r] && q(t[r], u, i || "function" != typeof n.type);
  i || null == n.__e || v(n.__e), n.__ = n.__e = n.__d = void 0;
}
function B(n, l, u) {
  return this.constructor(n, u);
}
function D(u, i, t) {
  var r, o, f;
  l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], M(i, u = (!r && t || i).__k = y(_, null, [u]), o || c, c, void 0 !== i.ownerSVGElement, !r && t ? [t] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), N(f, u);
}
function E(n, l) {
  D(n, l, E);
}
function F(l, u, i) {
  var t,
    r,
    o,
    f = h({}, l.props);
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), p(l.type, f, t || l.key, r || l.ref, null);
}
function G(n, l) {
  var u = {
    __c: l = "__cC" + e++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(function (n) {
          n.__e = !0, T(n);
        });
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;
        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}
n = s.slice, l = {
  __e: function (n, l, u, i) {
    for (var t, r, o; l = l.__;) if ((t = l.__c) && !t.__) try {
      if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
    } catch (l) {
      n = l;
    }
    throw n;
  }
}, u = 0, i = function (n) {
  return null != n && void 0 === n.constructor;
}, t = !1, x.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), T(this));
}, x.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), T(this));
}, x.prototype.render = _, r = [], f = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $.__r = 0, e = 0;


/***/ }),

/***/ 6734:
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ T),
/* harmony export */   useContext: () => (/* binding */ q),
/* harmony export */   useDebugValue: () => (/* binding */ x),
/* harmony export */   useEffect: () => (/* binding */ h),
/* harmony export */   useErrorBoundary: () => (/* binding */ P),
/* harmony export */   useId: () => (/* binding */ V),
/* harmony export */   useImperativeHandle: () => (/* binding */ A),
/* harmony export */   useLayoutEffect: () => (/* binding */ s),
/* harmony export */   useMemo: () => (/* binding */ F),
/* harmony export */   useReducer: () => (/* binding */ y),
/* harmony export */   useRef: () => (/* binding */ _),
/* harmony export */   useState: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 8048);

var t,
  r,
  u,
  i,
  o = 0,
  f = [],
  c = [],
  e = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,
  a = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,
  v = preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,
  l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,
  m = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function d(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.__h && preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(r, t, o || u), o = 0;
  var i = r.__H || (r.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({
    __V: c
  }), i.__[t];
}
function p(n) {
  return o = 1, y(B, n);
}
function y(n, u, i) {
  var o = d(t++, 2);
  if (o.t = n, !o.__c && (o.__ = [i ? i(u) : B(void 0, u), function (n) {
    var t = o.__N ? o.__N[0] : o.__[0],
      r = o.t(t, n);
    t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
  }], o.__c = r, !r.u)) {
    r.u = !0;
    var f = r.shouldComponentUpdate;
    r.shouldComponentUpdate = function (n, t, r) {
      if (!o.__c.__H) return !0;
      var u = o.__c.__H.__.filter(function (n) {
        return n.__c;
      });
      if (u.every(function (n) {
        return !n.__N;
      })) return !f || f.call(this, n, t, r);
      var i = !1;
      return u.forEach(function (n) {
        if (n.__N) {
          var t = n.__[0];
          n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
        }
      }), !(!i && o.__c.props === n) && (!f || f.call(this, n, t, r));
    };
  }
  return o.__N || o.__;
}
function h(u, i) {
  var o = d(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__H.__h.push(o));
}
function s(u, i) {
  var o = d(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__h.push(o));
}
function _(n) {
  return o = 5, F(function () {
    return {
      current: n
    };
  }, []);
}
function A(n, t, r) {
  o = 6, s(function () {
    return "function" == typeof n ? (n(t()), function () {
      return n(null);
    }) : n ? (n.current = t(), function () {
      return n.current = null;
    }) : void 0;
  }, null == r ? r : r.concat(n));
}
function F(n, r) {
  var u = d(t++, 7);
  return z(u.__H, r) ? (u.__V = n(), u.i = r, u.__h = n, u.__V) : u.__;
}
function T(n, t) {
  return o = 8, F(function () {
    return n;
  }, t);
}
function q(n) {
  var u = r.context[n.__c],
    i = d(t++, 9);
  return i.c = n, u ? (null == i.__ && (i.__ = !0, u.sub(r)), u.props.value) : n.__;
}
function x(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(r ? r(t) : t);
}
function P(n) {
  var u = d(t++, 10),
    i = p();
  return u.__ = n, r.componentDidCatch || (r.componentDidCatch = function (n, t) {
    u.__ && u.__(n, t), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}
function V() {
  var n = d(t++, 11);
  if (!n.__) {
    for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
    var i = u.__m || (u.__m = [0, 0]);
    n.__ = "P" + i[0] + "-" + i[1]++;
  }
  return n.__;
}
function b() {
  for (var t; t = f.shift();) if (t.__P && t.__H) try {
    t.__H.__h.forEach(k), t.__H.__h.forEach(w), t.__H.__h = [];
  } catch (r) {
    t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, t.__v);
  }
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  r = null, e && e(n);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  a && a(n), t = 0;
  var i = (r = n.__c).__H;
  i && (u === r ? (i.__h = [], r.__h = [], i.__.forEach(function (n) {
    n.__N && (n.__ = n.__N), n.__V = c, n.__N = n.i = void 0;
  })) : (i.__h.forEach(k), i.__h.forEach(w), i.__h = [])), u = r;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed = function (t) {
  v && v(t);
  var o = t.__c;
  o && o.__H && (o.__H.__h.length && (1 !== f.push(o) && i === preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame || ((i = preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame) || j)(b)), o.__H.__.forEach(function (n) {
    n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
  })), u = r = null;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__c = function (t, r) {
  r.some(function (t) {
    try {
      t.__h.forEach(k), t.__h = t.__h.filter(function (n) {
        return !n.__ || w(n);
      });
    } catch (u) {
      r.some(function (n) {
        n.__h && (n.__h = []);
      }), r = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u, t.__v);
    }
  }), l && l(t, r);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (t) {
  m && m(t);
  var r,
    u = t.__c;
  u && u.__H && (u.__H.__.forEach(function (n) {
    try {
      k(n);
    } catch (n) {
      r = n;
    }
  }), u.__H = void 0, r && preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, u.__v));
};
var g = "function" == typeof requestAnimationFrame;
function j(n) {
  var t,
    r = function () {
      clearTimeout(u), g && cancelAnimationFrame(t), setTimeout(n);
    },
    u = setTimeout(r, 100);
  g && (t = requestAnimationFrame(r));
}
function k(n) {
  var t = r,
    u = n.__c;
  "function" == typeof u && (n.__c = void 0, u()), r = t;
}
function w(n) {
  var t = r;
  n.__c = n.__(), r = t;
}
function z(n, t) {
  return !n || n.length !== t.length || t.some(function (t, r) {
    return t !== n[r];
  });
}
function B(n, t) {
  return "function" == typeof t ? t(n) : t;
}


/***/ }),

/***/ 6042:
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/ReplaySubject.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReplaySubject: () => (/* binding */ ReplaySubject)
/* harmony export */ });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject */ 819);
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ 5152);


class ReplaySubject extends _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject {
  constructor(_bufferSize = Infinity, _windowTime = Infinity, _timestampProvider = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.dateTimestampProvider) {
    super();
    this._bufferSize = _bufferSize;
    this._windowTime = _windowTime;
    this._timestampProvider = _timestampProvider;
    this._buffer = [];
    this._infiniteTimeWindow = true;
    this._infiniteTimeWindow = _windowTime === Infinity;
    this._bufferSize = Math.max(1, _bufferSize);
    this._windowTime = Math.max(1, _windowTime);
  }
  next(value) {
    const {
      isStopped,
      _buffer,
      _infiniteTimeWindow,
      _timestampProvider,
      _windowTime
    } = this;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    super.next(value);
  }
  _subscribe(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    const subscription = this._innerSubscribe(subscriber);
    const {
      _infiniteTimeWindow,
      _buffer
    } = this;
    const copy = _buffer.slice();
    for (let i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  }
  _trimBuffer() {
    const {
      _bufferSize,
      _timestampProvider,
      _buffer,
      _infiniteTimeWindow
    } = this;
    const adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      const now = _timestampProvider.now();
      let last = 0;
      for (let i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last = i;
      }
      last && _buffer.splice(0, last + 1);
    }
  }
}

/***/ }),

/***/ 3617:
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/merge.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/* harmony import */ var _operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../operators/mergeAll */ 3222);
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./innerFrom */ 2645);
/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty */ 9400);
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ 4083);
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./from */ 5429);





function merge(...args) {
  const scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
  const concurrent = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popNumber)(args, Infinity);
  const sources = args;
  return !sources.length ? _empty__WEBPACK_IMPORTED_MODULE_1__.EMPTY : sources.length === 1 ? (0,_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(sources[0]) : (0,_operators_mergeAll__WEBPACK_IMPORTED_MODULE_3__.mergeAll)(concurrent)((0,_from__WEBPACK_IMPORTED_MODULE_4__.from)(sources, scheduler));
}

/***/ }),

/***/ 1870:
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/share.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   share: () => (/* binding */ share)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../observable/innerFrom */ 2645);
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subject */ 819);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Subscriber */ 9285);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 3200);




function share(options = {}) {
  const {
    connector = () => new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;
  return wrapperSource => {
    let connection;
    let resetConnection;
    let subject;
    let refCount = 0;
    let hasCompleted = false;
    let hasErrored = false;
    const cancelReset = () => {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = undefined;
    };
    const reset = () => {
      cancelReset();
      connection = subject = undefined;
      hasCompleted = hasErrored = false;
    };
    const resetAndUnsubscribe = () => {
      const conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
      refCount++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      const dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(() => {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount > 0) {
        connection = new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
          next: value => dest.next(value),
          error: err => {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: () => {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
function handleReset(reset, on, ...args) {
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  const onSubscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
    next: () => {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(on(...args)).subscribe(onSubscriber);
}

/***/ }),

/***/ 6301:
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/shareReplay.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shareReplay: () => (/* binding */ shareReplay)
/* harmony export */ });
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReplaySubject */ 6042);
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./share */ 1870);


function shareReplay(configOrBufferSize, windowTime, scheduler) {
  let bufferSize;
  let refCount = false;
  if (configOrBufferSize && typeof configOrBufferSize === 'object') {
    ({
      bufferSize = Infinity,
      windowTime = Infinity,
      refCount = false,
      scheduler
    } = configOrBufferSize);
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }
  return (0,_share__WEBPACK_IMPORTED_MODULE_0__.share)({
    connector: () => new _ReplaySubject__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(bufferSize, windowTime, scheduler),
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount
  });
}

/***/ }),

/***/ 5842:
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/withLatestFrom.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withLatestFrom: () => (/* binding */ withLatestFrom)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 3200);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OperatorSubscriber */ 1687);
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ 2645);
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/identity */ 1440);
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/noop */ 4318);
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ 4083);






function withLatestFrom(...inputs) {
  const project = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popResultSelector)(inputs);
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    const len = inputs.length;
    const otherValues = new Array(len);
    let hasValue = inputs.map(() => false);
    let ready = false;
    for (let i = 0; i < len; i++) {
      (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(inputs[i]).subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.createOperatorSubscriber)(subscriber, value => {
        otherValues[i] = value;
        if (!ready && !hasValue[i]) {
          hasValue[i] = true;
          (ready = hasValue.every(_util_identity__WEBPACK_IMPORTED_MODULE_4__.identity)) && (hasValue = null);
        }
      }, _util_noop__WEBPACK_IMPORTED_MODULE_5__.noop));
    }
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_3__.createOperatorSubscriber)(subscriber, value => {
      if (ready) {
        const values = [value, ...otherValues];
        subscriber.next(project ? project(...values) : values);
      }
    }));
  });
}

/***/ }),

/***/ 2659:
/*!***********************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/admin-panel.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `app-admin-panel .p-tabview {
  height: 100%;
  display: flex;
  flex-direction: column;
}
app-admin-panel .p-tabview .p-tabview-panels {
  flex: 1;
  overflow: auto;
}
app-admin-panel .p-tabview .p-tabview-panels .p-tabview-panel {
  height: 100%;
}
app-admin-panel .p-tabview .p-tabview-panels .p-tabview-panel .tab-content {
  height: 100%;
}`, "",{"version":3,"sources":["webpack://./src/app/home/components/admin-panel/admin-panel.component.scss"],"names":[],"mappings":"AACE;EACE,YAAA;EACA,aAAA;EACA,sBAAA;AAAJ;AAEI;EACE,OAAA;EACA,cAAA;AAAN;AAEM;EACE,YAAA;AAAR;AAEQ;EACE,YAAA;AAAV","sourcesContent":["app-admin-panel {\r\n  .p-tabview {\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n\r\n    .p-tabview-panels {\r\n      flex: 1;\r\n      overflow: auto;\r\n\r\n      .p-tabview-panel {\r\n        height: 100%;\r\n\r\n        .tab-content {\r\n          height: 100%;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 4763:
/*!**************************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/menu-administration/menu-administration.component.scss?ngResource ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

app-menu-administration .menu-administration-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 32px;
}
app-menu-administration .menu-administration-container .user-top-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
app-menu-administration .menu-administration-container .user-top-service .date {
  font-size: 20px;
  font-weight: 600;
}
app-menu-administration .menu-administration-container .tabs-container {
  height: 1%;
  flex: 1;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview {
  height: 100%;
  display: flex;
  flex-direction: column;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .tab-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .tab-header i {
  transform: translateY(2px);
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .tab-header i:hover {
  opacity: 0.7;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels {
  flex: 1;
  overflow: auto;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel {
  height: 100%;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable {
  height: 100%;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper {
  height: 100%;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper thead .header-cell-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper thead .header-cell-service button {
  width: 30px;
  height: 30px;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper thead .header-cell-service button .p-button-icon {
  height: 14px;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper .group-header {
  height: 40px;
  background-color: #f8f9fa;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper .group-header td {
  padding: 0;
  text-align: center;
  font-weight: 500;
  color: #D32E16;
}
app-menu-administration .menu-administration-container .tabs-container .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper tbody tr:not(.group-header) td {
  max-width: 50px;
  height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content {
  min-width: 480px;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .form .p-inputwrapper {
  width: 100%;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .form .form-field-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .form .form-field-wrapper small {
  font-size: 10px;
  color: #E53935;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .form .add-meal-btn {
  align-self: end;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .modal-service {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
app-menu-administration .menu-administration-container .tabs-container .modal-content .modal-service .p-progress-spinner-circle {
  stroke: white;
  animation: none;
}
app-menu-administration .menu-administration-container .tabs-container .calendar-modal .p-dialog-content {
  padding-bottom: 32px;
}
app-menu-administration .menu-administration-container .tabs-container .calendar-modal .p-dialog-content .fc {
  height: 100% !important;
}
app-menu-administration .menu-administration-container .tabs-container .calendar-modal .p-dialog-content .fc .fc-view-harness {
  height: 1%;
  flex: 1;
}
app-menu-administration .menu-administration-container .tabs-container .calendar-modal .p-dialog-content .fc button {
  background: #D32E16;
  border: none;
  box-shadow: none;
}
app-menu-administration .menu-administration-container .tabs-container .calendar-modal .p-dialog-content .fc button:active {
  background: #c82c13;
}
app-menu-administration .menu-administration-container .bottom-service {
  display: flex;
  justify-content: center;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/home/components/admin-panel/components/menu-administration/menu-administration.component.scss","webpack://./src/themes/mytheme/variables/_data.scss","webpack://./src/themes/mytheme/variables/_message.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AAnCE;EACE,aAAA;EACA,sBAAA;EACA,QAAA;EACA,YAAA;EACA,aAAA;AAsCJ;AApCI;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AAsCN;AApCM;EACE,eAAA;EACA,gBAAA;AAsCR;AAlCI;EACE,UAAA;EACA,OAAA;AAoCN;AAlCM;EACE,YAAA;EACA,aAAA;EACA,sBAAA;AAoCR;AAlCQ;EACE,aAAA;EACA,mBAAA;EACA,SAAA;AAoCV;AAlCU;EACE,0BAAA;AAoCZ;AAlCY;EACE,YAAA;AAoCd;AA/BQ;EACE,OAAA;EACA,cAAA;AAiCV;AA/BU;EACE,YAAA;AAiCZ;AA/BY;EACE,YAAA;AAiCd;AA/Bc;EACE,YAAA;AAiChB;AA/BgB;EACE,gBAAA;EACA,MAAA;EACA,UAAA;AAiClB;AA/BkB;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AAiCpB;AA/BoB;EACE,WAAA;EACA,YAAA;AAiCtB;AA/BsB;EACE,YAAA;AAiCxB;AA3BgB;EACE,YAAA;EACA,yBCNF;ADmChB;AA3BkB;EACE,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,cDrFL;ACkHf;AAvBoB;EACE,eAAA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AAyBtB;AAdM;EACE,gBAAA;EACA,oBAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;AAgBR;AAdQ;EACE,gBAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;AAgBV;AAdU;EACE,WAAA;AAgBZ;AAbU;EACE,WAAA;EACA,aAAA;EACA,sBAAA;EACA,QAAA;AAeZ;AAbY;EACE,eAAA;EACA,cEKU;AFUxB;AAXU;EACE,eAAA;AAaZ;AATQ;EACE,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,QAAA;AAWV;AATU;EACE,aAAA;EACA,eAAA;AAWZ;AALQ;EACE,oBAAA;AAOV;AALU;EACE,uBAAA;AAOZ;AALY;EACE,UAAA;EACA,OAAA;AAOd;AAJY;EACE,mBDvKC;ECwKD,YAAA;EACA,gBAAA;AAMd;AAJc;EACE,mBD3KG;ACiLnB;AAEI;EACE,aAAA;EACA,uBAAA;AAAN","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\napp-menu-administration {\r\n  .menu-administration-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    height: 100%;\r\n    padding: 32px;\r\n\r\n    .user-top-service {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n\r\n      .date {\r\n        font-size: 20px;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n\r\n    .tabs-container {\r\n      height: 1%;\r\n      flex: 1;\r\n\r\n      .p-tabview {\r\n        height: 100%;\r\n        display: flex;\r\n        flex-direction: column;\r\n\r\n        .tab-header {\r\n          display: flex;\r\n          align-items: center;\r\n          gap: 12px;\r\n\r\n          i {\r\n            transform: translateY(2px);\r\n\r\n            &:hover {\r\n              opacity: 0.7;\r\n            }\r\n          }\r\n        }\r\n\r\n        .p-tabview-panels {\r\n          flex: 1;\r\n          overflow: auto;\r\n\r\n          .p-tabview-panel {\r\n            height: 100%;\r\n\r\n            .p-datatable {\r\n              height: 100%;\r\n\r\n              .p-datatable-wrapper {\r\n                height: 100%;\r\n\r\n                thead {\r\n                  position: sticky;\r\n                  top: 0;\r\n                  z-index: 1;\r\n\r\n                  .header-cell-service {\r\n                    display: flex;\r\n                    align-items: center;\r\n                    justify-content: space-between;\r\n\r\n                    button {\r\n                      width: 30px;\r\n                      height: 30px;\r\n\r\n                      .p-button-icon {\r\n                        height: 14px;\r\n                      }\r\n                    }\r\n                  }\r\n                }\r\n\r\n                .group-header {\r\n                  height: 40px;\r\n                  background-color: var.$tableHeaderBg;\r\n\r\n                  td {\r\n                    padding: 0;\r\n                    text-align: center;\r\n                    font-weight: 500;\r\n                    color: var.$primaryColor;\r\n                  }\r\n                }\r\n\r\n                tbody {\r\n                  tr:not(.group-header) {\r\n                    td {\r\n                      max-width: 50px;\r\n                      height: 50px;\r\n                      white-space: nowrap;\r\n                      overflow: hidden;\r\n                      text-overflow: ellipsis;\r\n                    }\r\n                  }\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n\r\n\r\n      .modal-content {\r\n        min-width: 480px;\r\n        padding: 0 24px 24px;\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 24px;\r\n\r\n        .form {\r\n          margin-top: 24px;\r\n          display: flex;\r\n          flex-direction: column;\r\n          gap: 16px;\r\n\r\n          .p-inputwrapper {\r\n            width: 100%;\r\n          }\r\n\r\n          .form-field-wrapper {\r\n            width: 100%;\r\n            display: flex;\r\n            flex-direction: column;\r\n            gap: 4px;\r\n\r\n            small {\r\n              font-size: 10px;\r\n              color: var.$errorMessageTextColor;\r\n            }\r\n          }\r\n\r\n          .add-meal-btn {\r\n            align-self: end;\r\n          }\r\n        }\r\n\r\n        .modal-service {\r\n          display: flex;\r\n          align-items: center;\r\n          justify-content: flex-end;\r\n          gap: 8px;\r\n\r\n          .p-progress-spinner-circle {\r\n            stroke: white;\r\n            animation: none;\r\n          }\r\n        }\r\n      }\r\n\r\n      .calendar-modal {\r\n        .p-dialog-content {\r\n          padding-bottom: 32px;\r\n\r\n          .fc {\r\n            height: 100% !important;\r\n\r\n            .fc-view-harness {\r\n              height: 1%;\r\n              flex: 1;\r\n            }\r\n\r\n            button {\r\n              background: var.$primaryColor;\r\n              border: none;\r\n              box-shadow: none;\r\n\r\n              &:active {\r\n                background: var.$primaryDarkColor;\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    .bottom-service {\r\n      display: flex;\r\n      justify-content: center;\r\n    }\r\n  }\r\n}\r\n","/// Background of a paginator\r\n/// @group data\r\n$paginatorBg: #ffffff;\r\n\r\n/// Text color of a paginator\r\n/// @group data\r\n$paginatorTextColor: $textSecondaryColor;\r\n\r\n/// Border of a paginator\r\n/// @group data\r\n$paginatorBorder: solid #e9ecef;\r\n\r\n/// Border width of a paginator\r\n/// @group data\r\n$paginatorBorderWidth: 0;\r\n\r\n/// Padding of a paginator\r\n/// @group data\r\n$paginatorPadding: 0.5rem 1rem;\r\n\r\n/// Width of a paginator element\r\n/// @group data\r\n$paginatorElementWidth: $buttonIconOnlyWidth;\r\n\r\n/// Height of a paginator element\r\n/// @group data\r\n$paginatorElementHeight: $buttonIconOnlyWidth;\r\n\r\n/// Background of a paginator element\r\n/// @group data\r\n$paginatorElementBg: transparent;\r\n\r\n/// Border of a paginator element\r\n/// @group data\r\n$paginatorElementBorder: 0 none;\r\n\r\n/// Icon color of a paginator element\r\n/// @group data\r\n$paginatorElementIconColor: $textSecondaryColor;\r\n\r\n/// Background of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBg: #e9ecef;\r\n\r\n/// Border color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBorderColor: transparent;\r\n\r\n/// Icon color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementIconHoverColor: $textSecondaryColor;\r\n\r\n/// Border radius of a paginator element\r\n/// @group data\r\n$paginatorElementBorderRadius: $borderRadius;\r\n\r\n/// Margin of a paginator element\r\n/// @group data\r\n$paginatorElementMargin: 0.143rem;\r\n\r\n/// Padding of a paginator element\r\n/// @group data\r\n$paginatorElementPadding: 0;\r\n\r\n/// Border of a table header\r\n/// @group data\r\n$tableHeaderBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header\r\n/// @group data\r\n$tableHeaderBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header\r\n/// @group data\r\n$tableHeaderBg: #f8f9fa;\r\n\r\n/// Text color of a table header\r\n/// @group data\r\n$tableHeaderTextColor: $textColor;\r\n\r\n/// Font weight of a table header\r\n/// @group data\r\n$tableHeaderFontWeight: 600;\r\n\r\n/// Padding of a table header, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderPadding: 1rem 1rem;\r\n\r\n/// Padding of a table header cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table header cell\r\n/// @group data\r\n$tableHeaderCellBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell\r\n/// @group data\r\n$tableHeaderCellTextColor: $textColor;\r\n\r\n/// Font weight of a table header cell\r\n/// @group data\r\n$tableHeaderCellFontWeight: 600;\r\n\r\n/// Border of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellHoverBg: #e9ecef;\r\n\r\n/// Text color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellTextHoverColor: $textColor;\r\n\r\n/// Icon color of a table header cell\r\n/// @group data\r\n$tableHeaderCellIconColor: $textSecondaryColor;\r\n\r\n/// Icon color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellIconHoverColor: $textSecondaryColor;\r\n\r\n/// Background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextColor: $primaryColor;\r\n\r\n/// Hover background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightHoverBg: #e9ecef;\r\n\r\n/// Hover text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextHoverColor: $primaryColor;\r\n\r\n/// Size of a multiple column sorting order indicator\r\n/// @group data\r\n$tableSortableColumnBadgeSize: 1.143rem;\r\n\r\n/// Background of a table body row\r\n/// @group data\r\n$tableBodyRowBg: #ffffff;\r\n\r\n/// Text color of a table body row\r\n/// @group data\r\n$tableBodyRowTextColor: $textColor;\r\n\r\n/// Background of an even table body row\r\n/// @group data\r\n$tableBodyRowEvenBg: #ffffff;\r\n\r\n/// Background of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowHoverBg: #e9ecef;\r\n\r\n/// Text color of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowTextHoverColor: $textColor;\r\n\r\n/// Border for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorder: 1px solid rgba(0, 0, 0, 0.08);\r\n\r\n/// Border width for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Padding for a cell of a table toby row, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableBodyCellPadding: 1rem 1rem;\r\n\r\n/// Padding of a table footer cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table footer cell\r\n/// @group data\r\n$tableFooterCellBg: #f8f9fa;\r\n\r\n/// Text color of a table footer cell\r\n/// @group data\r\n$tableFooterCellTextColor: $textColor;\r\n\r\n/// Font weight of a table footer cell\r\n/// @group data\r\n$tableFooterCellFontWeight: 600;\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Backgground of a table column resize indicator bar\r\n/// @group data\r\n$tableResizerHelperBg: $primaryColor;\r\n\r\n/// Border of a table footer\r\n/// @group data\r\n$tableFooterBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer\r\n/// @group data\r\n$tableFooterBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table footer\r\n/// @group data\r\n$tableFooterBg: #f8f9fa;\r\n\r\n/// Text color of a table footer\r\n/// @group data\r\n$tableFooterTextColor: $textColor;\r\n\r\n/// Font weight of a table footer\r\n/// @group data\r\n$tableFooterFontWeight: 600;\r\n\r\n/// Padding of a table footer, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterPadding: 1rem 1rem;\r\n\r\n/// Content alignment of a table cell\r\n/// @group data\r\n$tableCellContentAlignment: left;\r\n\r\n/// Border width of a table paginator positioned at top\r\n/// @group data\r\n$tableTopPaginatorBorderWidth: 1px 0 1px 0;\r\n\r\n/// Border width of a table paginator positioned at bottom\r\n/// @group data\r\n$tableBottomPaginatorBorderWidth: 0 0 1px 0;\r\n\r\n/// Scale factor of a small datatable\r\n/// @group data\r\n$tableScaleSM: 0.5;\r\n\r\n/// Scale factor of a large datatable\r\n/// @group data\r\n$tableScaleLG: 1.25;\r\n\r\n/// Padding for content section of a dataview\r\n/// @group data\r\n$dataViewContentPadding: 0;\r\n\r\n/// Border for content section of a dataview\r\n/// @group data\r\n$dataViewContentBorder: 0 none;\r\n\r\n/// Breakpoint of orderlist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$orderListBreakpoint: 769px;\r\n\r\n/// Breakpoint of picklist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$pickListBreakpoint: 769px;\r\n\r\n/// Padding of a tree\r\n/// @group data\r\n$treeContainerPadding: 0.286rem;\r\n\r\n/// Padding of a tree node\r\n/// @group data\r\n$treeNodePadding: 0.143rem;\r\n\r\n/// Padding of a tree node content consists of toggler, icon and label\r\n/// @group data\r\n$treeNodeContentPadding: 0.5rem;\r\n\r\n/// Padding of a tree node children container\r\n/// @group data\r\n$treeNodeChildrenPadding: 0 0 0 1rem;\r\n\r\n/// Color of a treenode data icon, $dataActionIconColor for the toggler element\r\n/// @group data\r\n$treeNodeIconColor: $textSecondaryColor;\r\n\r\n/// Padding of a vertical timeline content element\r\n/// @group data\r\n$timelineVerticalEventContentPadding: 0 1rem;\r\n\r\n/// Padding of a horizontal timeline content element\r\n/// @group data\r\n$timelineHorizontalEventContentPadding: 1rem 0;\r\n\r\n/// Width of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerWidth: 1rem;\r\n\r\n/// Height of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerHeight: 1rem;\r\n\r\n/// Border radius of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorderRadius: 50%;\r\n\r\n/// Border of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorder: 2px solid $highlightBg;\r\n\r\n/// Background of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBackground: $highlightTextColor;\r\n\r\n/// Size of a timeline connector\r\n/// @group data\r\n$timelineEventConnectorSize: 2px;\r\n\r\n/// Color of a timeline event\r\n/// @group data\r\n$timelineEventColor: #dee2e6;\r\n\r\n/// Color of a line to connect to organization chart nodes\r\n/// @group data\r\n$organizationChartConnectorColor: #dee2e6;\r\n","/// Margin of a message\r\n/// @group message\r\n$messageMargin: 1rem 0;\r\n\r\n/// Padding of a message\r\n/// @group message\r\n$messagePadding: 1rem 1.5rem;\r\n\r\n/// Border width of a message\r\n/// @group message\r\n$messageBorderWidth: 0 0 0 4px;\r\n\r\n/// Font size of a message icon\r\n/// @group message\r\n$messageIconFontSize: 1.5rem;\r\n\r\n/// Font size of a message text\r\n/// @group message\r\n$messageTextFontSize: 1rem;\r\n\r\n/// Font weight of a message text\r\n/// @group message\r\n$messageTextFontWeight: 500;\r\n\r\n/// Padding of an inline message\r\n/// @group message\r\n$inlineMessagePadding: $inputPadding;\r\n\r\n/// Margin of an inline message\r\n/// @group message\r\n$inlineMessageMargin: 0;\r\n\r\n/// Font size of an inline message icon\r\n/// @group message\r\n$inlineMessageIconFontSize: 1rem;\r\n\r\n/// Padding of an inline message text\r\n/// @group message\r\n$inlineMessageTextFontSize: 1rem;\r\n\r\n/// Border width of an inline message text\r\n/// @group message\r\n$inlineMessageBorderWidth: 1px;\r\n\r\n/// Font size of a toast message icon\r\n/// @group message\r\n$toastIconFontSize: 1rem;\r\n\r\n/// Margin of a toast message text\r\n/// @group message\r\n$toastMessageTextMargin: 0 0 0 1rem;\r\n\r\n/// Margin of a toast message\r\n/// @group message\r\n$toastMargin: 0 0 1rem 0;\r\n\r\n/// Padding of a toast message\r\n/// @group message\r\n$toastPadding: 1.5rem;\r\n\r\n/// Border width of a toast message\r\n/// @group message\r\n$toastBorderWidth: 0 0 0 4px;\r\n\r\n/// Box shadow of a toast message\r\n/// @group message\r\n$toastShadow: none;\r\n\r\n/// Opacity of a toast message\r\n/// @group message\r\n$toastOpacity: .9;\r\n\r\n/// Font weight of a toast message title text\r\n/// @group message\r\n$toastTitleFontWeight: 700;\r\n\r\n/// Margin of a toast message detail text\r\n/// @group message\r\n$toastDetailMargin: 0;\r\n\r\n/// Background of an info message\r\n/// @group message\r\n$infoMessageBg: #039BE5;\r\n\r\n/// Border of an info message\r\n/// @group message\r\n$infoMessageBorder: solid #027cb7;\r\n\r\n/// Text color of an info message\r\n/// @group message\r\n$infoMessageTextColor: #ffffff;\r\n\r\n/// Icon color of an info message\r\n/// @group message\r\n$infoMessageIconColor: #ffffff;\r\n\r\n/// Background of a success message\r\n/// @group message\r\n$successMessageBg: #F0FDF4;\r\n\r\n/// Border of a success message\r\n/// @group message\r\n$successMessageBorder: 0 none;\r\n\r\n/// Text color of a success message\r\n/// @group message\r\n$successMessageTextColor: #22C55E;\r\n\r\n/// Icon color of a success message\r\n/// @group message\r\n$successMessageIconColor: #22C55E;\r\n\r\n/// Background of a warning message\r\n/// @group message\r\n$warningMessageBg: #fff2d5;\r\n\r\n/// Border of a warning message\r\n/// @group message\r\n$warningMessageBorder: 0 none;\r\n\r\n/// Text color of a warning message\r\n/// @group message\r\n$warningMessageTextColor: #ffa600;\r\n\r\n/// Icon color of a warning message\r\n/// @group message\r\n$warningMessageIconColor: $textColor;\r\n\r\n/// Background of an error message\r\n/// @group message\r\n$errorMessageBg: #ffd1d1;\r\n\r\n/// Border of an error message\r\n/// @group message\r\n$errorMessageBorder: 0 none;\r\n\r\n/// Text color of an error message\r\n/// @group message\r\n$errorMessageTextColor: #E53935;\r\n\r\n/// Icon color of an error message\r\n/// @group message\r\n$errorMessageIconColor: #E53935;\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 5611:
/*!**************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/personal-menu/personal-menu.component.scss?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.user-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.user-menu-container .user-menu-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 1%;
  flex: 1;
  padding: 32px;
}
.user-menu-container .user-menu-content .user-top-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-menu-container .user-menu-content .user-top-service .user-name, .user-menu-container .user-menu-content .user-top-service .date {
  font-size: 20px;
  font-weight: 600;
}
.user-menu-container .user-menu-content .table-container {
  height: 1%;
  flex: 1;
}`, "",{"version":3,"sources":["webpack://./src/app/home/components/admin-panel/components/personal-menu/personal-menu.component.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,sBAAA;EACA,YAAA;AACF;AACE;EACE,aAAA;EACA,sBAAA;EACA,QAAA;EACA,UAAA;EACA,OAAA;EACA,aAAA;AACJ;AACI;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AACN;AACM;EACE,eAAA;EACA,gBAAA;AACR;AAGI;EACE,UAAA;EACA,OAAA;AADN","sourcesContent":[".user-menu-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n\r\n  .user-menu-content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    height: 1%;\r\n    flex: 1;\r\n    padding: 32px;\r\n\r\n    .user-top-service {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n\r\n      .user-name, .date {\r\n        font-size: 20px;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n\r\n    .table-container {\r\n      height: 1%;\r\n      flex: 1;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 5862:
/*!********************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/users-management/users-management.component.scss?ngResource ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

app-users-management .users-management-container {
  width: 100%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
app-users-management .users-management-container .table-top-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
app-users-management .users-management-container .table-top-service h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
app-users-management .users-management-container .table-container {
  height: 1%;
  width: 100%;
  flex: 1;
  position: relative;
}
app-users-management .users-management-container .table-container .p-datatable {
  height: 100%;
}
app-users-management .users-management-container .table-container .p-datatable .p-datatable-wrapper {
  height: 100%;
}
app-users-management .users-management-container .table-container .p-datatable .sticky-left {
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: 100px;
}
app-users-management .users-management-container .table-container .p-datatable .sticky-right {
  position: sticky;
  right: 0;
  z-index: 1;
  padding: 0;
  min-width: 90px;
  text-align: end;
}
app-users-management .users-management-container .table-container .p-datatable td:not(.sticky-left, .sticky-right) {
  min-width: 240px;
}
app-users-management .users-management-container .table-container .p-datatable thead {
  position: sticky;
  top: 0;
  z-index: 2;
}
app-users-management .users-management-container .table-container .p-datatable tbody td {
  background-color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
app-users-management .users-management-container .table-container .p-datatable tr td {
  height: 56px;
  padding: 0 16px;
}
app-users-management .users-management-container .table-container .p-datatable tr td.p-editable-column {
  cursor: pointer;
}
app-users-management .users-management-container .table-container .p-datatable tr td .Working .p-tag {
  background-color: #F0FDF4;
  color: #22C55E;
}
app-users-management .users-management-container .table-container .p-datatable tr td .Vacation .p-tag {
  background-color: #fff2d5;
  color: #ffa600;
}
app-users-management .users-management-container .table-container .p-datatable tr td .Mission .p-tag {
  background-color: #ffd1d1;
  color: #E53935;
}
app-users-management .users-management-container .table-container .p-datatable tr td .Medical .p-tag {
  background-color: #039BE5;
  color: #ffffff;
}
app-users-management .users-management-container .table-container .p-datatable td {
  max-width: 50px;
}
app-users-management .modal-content {
  min-width: 480px;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
app-users-management .modal-content .form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
app-users-management .modal-content .form .form-field-wrapper {
  width: 100%;
}
app-users-management .modal-content .form .form-field-wrapper input, app-users-management .modal-content .form .form-field-wrapper .p-inputwrapper {
  width: 100%;
}
app-users-management .modal-content .form .form-field-wrapper small {
  display: inline-block;
  font-size: 10px;
  height: 12px;
  width: 100%;
  color: #e4677e;
}
app-users-management .modal-content .modal-service {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
app-users-management .modal-content .modal-service .p-progress-spinner-circle {
  stroke: white;
  animation: none;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/home/components/admin-panel/components/users-management/users-management.component.scss","webpack://./src/themes/mytheme/variables/_data.scss","webpack://./src/themes/mytheme/variables/_message.scss","webpack://./src/themes/mytheme/variables/_general.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AAlCE;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,SAAA;AAqCJ;AAnCI;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,WAAA;AAqCN;AAnCM;EACE,SAAA;EACA,eAAA;EACA,gBAAA;AAqCR;AAjCI;EACE,UAAA;EACA,WAAA;EACA,OAAA;EACA,kBAAA;AAmCN;AAjCM;EACE,YAAA;AAmCR;AAjCQ;EACE,YAAA;AAmCV;AAhCQ;EACE,gBAAA;EACA,OAAA;EACA,UAAA;EACA,gBAAA;AAkCV;AA/BQ;EACE,gBAAA;EACA,QAAA;EACA,UAAA;EACA,UAAA;EACA,eAAA;EACA,eAAA;AAiCV;AA9BQ;EACE,gBAAA;AAgCV;AA7BQ;EACE,gBAAA;EACA,MAAA;EACA,UAAA;AA+BV;AA3BU;EACE,yBCmFK;EDlFL,mBAAA;EACA,gBAAA;EACA,uBAAA;AA6BZ;AAxBU;EACE,YAAA;EACA,eAAA;AA0BZ;AAxBY;EACE,eAAA;AA0Bd;AAtBc;EACE,yBEaG;EFZH,cEoBU;AFI1B;AAnBc;EACE,yBEsBG;EFrBH,cE6BU;AFR1B;AAhBc;EACE,yBE+BC;EF9BD,cEsCQ;AFpBxB;AAbc;EACE,yBExBA;EFyBA,cEjBO;AFgCvB;AATQ;EACE,eAAA;AAWV;AALE;EACE,gBAAA;EACA,oBAAA;EACA,aAAA;EACA,sBAAA;EACA,SAAA;AAOJ;AALI;EACE,gBAAA;EACA,aAAA;EACA,sBAAA;EACA,QAAA;AAON;AALM;EACE,WAAA;AAOR;AALQ;EACE,WAAA;AAOV;AAJQ;EACE,qBAAA;EACA,eAAA;EACA,YAAA;EACA,WAAA;EACA,cGnEG;AHyEb;AADI;EACE,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,QAAA;AAGN;AADM;EACE,aAAA;EACA,eAAA;AAGR","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\napp-users-management {\r\n\r\n  .users-management-container {\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 32px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    gap: 24px;\r\n\r\n    .table-top-service {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      width: 100%;\r\n\r\n      h2 {\r\n        margin: 0;\r\n        font-size: 20px;\r\n        font-weight: 600;\r\n      }\r\n    }\r\n\r\n    .table-container {\r\n      height: 1%;\r\n      width: 100%;\r\n      flex: 1;\r\n      position: relative;\r\n\r\n      .p-datatable {\r\n        height: 100%;\r\n\r\n        .p-datatable-wrapper {\r\n          height: 100%;\r\n        }\r\n\r\n        .sticky-left {\r\n          position: sticky;\r\n          left: 0;\r\n          z-index: 1;\r\n          min-width: 100px;\r\n        }\r\n\r\n        .sticky-right {\r\n          position: sticky;\r\n          right: 0;\r\n          z-index: 1;\r\n          padding: 0;\r\n          min-width: 90px;\r\n          text-align: end;\r\n        }\r\n\r\n        td:not(.sticky-left, .sticky-right) {\r\n          min-width: 240px;\r\n        }\r\n\r\n        thead {\r\n          position: sticky;\r\n          top: 0;\r\n          z-index: 2;\r\n        }\r\n\r\n        tbody {\r\n          td {\r\n            background-color: var.$tableBodyRowBg;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n          }\r\n        }\r\n\r\n        tr {\r\n          td {\r\n            height: 56px;\r\n            padding: 0 16px;\r\n\r\n            &.p-editable-column {\r\n              cursor: pointer;\r\n            }\r\n\r\n            .Working {\r\n              .p-tag {\r\n                background-color: var.$successMessageBg;\r\n                color: var.$successMessageTextColor;\r\n              }\r\n            }\r\n\r\n            .Vacation {\r\n              .p-tag {\r\n                background-color: var.$warningMessageBg;\r\n                color: var.$warningMessageTextColor;\r\n              }\r\n            }\r\n\r\n            .Mission {\r\n              .p-tag {\r\n                background-color: var.$errorMessageBg;\r\n                color: var.$errorMessageTextColor;\r\n              }\r\n            }\r\n\r\n            .Medical {\r\n              .p-tag {\r\n                background-color: var.$infoMessageBg;\r\n                color: var.$infoMessageTextColor;\r\n              }\r\n            }\r\n          }\r\n        }\r\n\r\n        td {\r\n          max-width: 50px;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  .modal-content {\r\n    min-width: 480px;\r\n    padding: 0 24px 24px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 24px;\r\n\r\n    .form {\r\n      margin-top: 24px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 2px;\r\n\r\n      .form-field-wrapper {\r\n        width: 100%;\r\n\r\n        input, .p-inputwrapper {\r\n          width: 100%;\r\n        }\r\n\r\n        small {\r\n          display: inline-block;\r\n          font-size: 10px;\r\n          height: 12px;\r\n          width: 100%;\r\n          color: var.$errorColor;\r\n        }\r\n      }\r\n    }\r\n\r\n    .modal-service {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: flex-end;\r\n      gap: 8px;\r\n\r\n      .p-progress-spinner-circle {\r\n        stroke: white;\r\n        animation: none;\r\n      }\r\n    }\r\n  }\r\n}\r\n","/// Background of a paginator\r\n/// @group data\r\n$paginatorBg: #ffffff;\r\n\r\n/// Text color of a paginator\r\n/// @group data\r\n$paginatorTextColor: $textSecondaryColor;\r\n\r\n/// Border of a paginator\r\n/// @group data\r\n$paginatorBorder: solid #e9ecef;\r\n\r\n/// Border width of a paginator\r\n/// @group data\r\n$paginatorBorderWidth: 0;\r\n\r\n/// Padding of a paginator\r\n/// @group data\r\n$paginatorPadding: 0.5rem 1rem;\r\n\r\n/// Width of a paginator element\r\n/// @group data\r\n$paginatorElementWidth: $buttonIconOnlyWidth;\r\n\r\n/// Height of a paginator element\r\n/// @group data\r\n$paginatorElementHeight: $buttonIconOnlyWidth;\r\n\r\n/// Background of a paginator element\r\n/// @group data\r\n$paginatorElementBg: transparent;\r\n\r\n/// Border of a paginator element\r\n/// @group data\r\n$paginatorElementBorder: 0 none;\r\n\r\n/// Icon color of a paginator element\r\n/// @group data\r\n$paginatorElementIconColor: $textSecondaryColor;\r\n\r\n/// Background of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBg: #e9ecef;\r\n\r\n/// Border color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBorderColor: transparent;\r\n\r\n/// Icon color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementIconHoverColor: $textSecondaryColor;\r\n\r\n/// Border radius of a paginator element\r\n/// @group data\r\n$paginatorElementBorderRadius: $borderRadius;\r\n\r\n/// Margin of a paginator element\r\n/// @group data\r\n$paginatorElementMargin: 0.143rem;\r\n\r\n/// Padding of a paginator element\r\n/// @group data\r\n$paginatorElementPadding: 0;\r\n\r\n/// Border of a table header\r\n/// @group data\r\n$tableHeaderBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header\r\n/// @group data\r\n$tableHeaderBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header\r\n/// @group data\r\n$tableHeaderBg: #f8f9fa;\r\n\r\n/// Text color of a table header\r\n/// @group data\r\n$tableHeaderTextColor: $textColor;\r\n\r\n/// Font weight of a table header\r\n/// @group data\r\n$tableHeaderFontWeight: 600;\r\n\r\n/// Padding of a table header, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderPadding: 1rem 1rem;\r\n\r\n/// Padding of a table header cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table header cell\r\n/// @group data\r\n$tableHeaderCellBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell\r\n/// @group data\r\n$tableHeaderCellTextColor: $textColor;\r\n\r\n/// Font weight of a table header cell\r\n/// @group data\r\n$tableHeaderCellFontWeight: 600;\r\n\r\n/// Border of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellHoverBg: #e9ecef;\r\n\r\n/// Text color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellTextHoverColor: $textColor;\r\n\r\n/// Icon color of a table header cell\r\n/// @group data\r\n$tableHeaderCellIconColor: $textSecondaryColor;\r\n\r\n/// Icon color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellIconHoverColor: $textSecondaryColor;\r\n\r\n/// Background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextColor: $primaryColor;\r\n\r\n/// Hover background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightHoverBg: #e9ecef;\r\n\r\n/// Hover text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextHoverColor: $primaryColor;\r\n\r\n/// Size of a multiple column sorting order indicator\r\n/// @group data\r\n$tableSortableColumnBadgeSize: 1.143rem;\r\n\r\n/// Background of a table body row\r\n/// @group data\r\n$tableBodyRowBg: #ffffff;\r\n\r\n/// Text color of a table body row\r\n/// @group data\r\n$tableBodyRowTextColor: $textColor;\r\n\r\n/// Background of an even table body row\r\n/// @group data\r\n$tableBodyRowEvenBg: #ffffff;\r\n\r\n/// Background of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowHoverBg: #e9ecef;\r\n\r\n/// Text color of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowTextHoverColor: $textColor;\r\n\r\n/// Border for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorder: 1px solid rgba(0, 0, 0, 0.08);\r\n\r\n/// Border width for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Padding for a cell of a table toby row, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableBodyCellPadding: 1rem 1rem;\r\n\r\n/// Padding of a table footer cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table footer cell\r\n/// @group data\r\n$tableFooterCellBg: #f8f9fa;\r\n\r\n/// Text color of a table footer cell\r\n/// @group data\r\n$tableFooterCellTextColor: $textColor;\r\n\r\n/// Font weight of a table footer cell\r\n/// @group data\r\n$tableFooterCellFontWeight: 600;\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Backgground of a table column resize indicator bar\r\n/// @group data\r\n$tableResizerHelperBg: $primaryColor;\r\n\r\n/// Border of a table footer\r\n/// @group data\r\n$tableFooterBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer\r\n/// @group data\r\n$tableFooterBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table footer\r\n/// @group data\r\n$tableFooterBg: #f8f9fa;\r\n\r\n/// Text color of a table footer\r\n/// @group data\r\n$tableFooterTextColor: $textColor;\r\n\r\n/// Font weight of a table footer\r\n/// @group data\r\n$tableFooterFontWeight: 600;\r\n\r\n/// Padding of a table footer, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterPadding: 1rem 1rem;\r\n\r\n/// Content alignment of a table cell\r\n/// @group data\r\n$tableCellContentAlignment: left;\r\n\r\n/// Border width of a table paginator positioned at top\r\n/// @group data\r\n$tableTopPaginatorBorderWidth: 1px 0 1px 0;\r\n\r\n/// Border width of a table paginator positioned at bottom\r\n/// @group data\r\n$tableBottomPaginatorBorderWidth: 0 0 1px 0;\r\n\r\n/// Scale factor of a small datatable\r\n/// @group data\r\n$tableScaleSM: 0.5;\r\n\r\n/// Scale factor of a large datatable\r\n/// @group data\r\n$tableScaleLG: 1.25;\r\n\r\n/// Padding for content section of a dataview\r\n/// @group data\r\n$dataViewContentPadding: 0;\r\n\r\n/// Border for content section of a dataview\r\n/// @group data\r\n$dataViewContentBorder: 0 none;\r\n\r\n/// Breakpoint of orderlist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$orderListBreakpoint: 769px;\r\n\r\n/// Breakpoint of picklist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$pickListBreakpoint: 769px;\r\n\r\n/// Padding of a tree\r\n/// @group data\r\n$treeContainerPadding: 0.286rem;\r\n\r\n/// Padding of a tree node\r\n/// @group data\r\n$treeNodePadding: 0.143rem;\r\n\r\n/// Padding of a tree node content consists of toggler, icon and label\r\n/// @group data\r\n$treeNodeContentPadding: 0.5rem;\r\n\r\n/// Padding of a tree node children container\r\n/// @group data\r\n$treeNodeChildrenPadding: 0 0 0 1rem;\r\n\r\n/// Color of a treenode data icon, $dataActionIconColor for the toggler element\r\n/// @group data\r\n$treeNodeIconColor: $textSecondaryColor;\r\n\r\n/// Padding of a vertical timeline content element\r\n/// @group data\r\n$timelineVerticalEventContentPadding: 0 1rem;\r\n\r\n/// Padding of a horizontal timeline content element\r\n/// @group data\r\n$timelineHorizontalEventContentPadding: 1rem 0;\r\n\r\n/// Width of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerWidth: 1rem;\r\n\r\n/// Height of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerHeight: 1rem;\r\n\r\n/// Border radius of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorderRadius: 50%;\r\n\r\n/// Border of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorder: 2px solid $highlightBg;\r\n\r\n/// Background of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBackground: $highlightTextColor;\r\n\r\n/// Size of a timeline connector\r\n/// @group data\r\n$timelineEventConnectorSize: 2px;\r\n\r\n/// Color of a timeline event\r\n/// @group data\r\n$timelineEventColor: #dee2e6;\r\n\r\n/// Color of a line to connect to organization chart nodes\r\n/// @group data\r\n$organizationChartConnectorColor: #dee2e6;\r\n","/// Margin of a message\r\n/// @group message\r\n$messageMargin: 1rem 0;\r\n\r\n/// Padding of a message\r\n/// @group message\r\n$messagePadding: 1rem 1.5rem;\r\n\r\n/// Border width of a message\r\n/// @group message\r\n$messageBorderWidth: 0 0 0 4px;\r\n\r\n/// Font size of a message icon\r\n/// @group message\r\n$messageIconFontSize: 1.5rem;\r\n\r\n/// Font size of a message text\r\n/// @group message\r\n$messageTextFontSize: 1rem;\r\n\r\n/// Font weight of a message text\r\n/// @group message\r\n$messageTextFontWeight: 500;\r\n\r\n/// Padding of an inline message\r\n/// @group message\r\n$inlineMessagePadding: $inputPadding;\r\n\r\n/// Margin of an inline message\r\n/// @group message\r\n$inlineMessageMargin: 0;\r\n\r\n/// Font size of an inline message icon\r\n/// @group message\r\n$inlineMessageIconFontSize: 1rem;\r\n\r\n/// Padding of an inline message text\r\n/// @group message\r\n$inlineMessageTextFontSize: 1rem;\r\n\r\n/// Border width of an inline message text\r\n/// @group message\r\n$inlineMessageBorderWidth: 1px;\r\n\r\n/// Font size of a toast message icon\r\n/// @group message\r\n$toastIconFontSize: 1rem;\r\n\r\n/// Margin of a toast message text\r\n/// @group message\r\n$toastMessageTextMargin: 0 0 0 1rem;\r\n\r\n/// Margin of a toast message\r\n/// @group message\r\n$toastMargin: 0 0 1rem 0;\r\n\r\n/// Padding of a toast message\r\n/// @group message\r\n$toastPadding: 1.5rem;\r\n\r\n/// Border width of a toast message\r\n/// @group message\r\n$toastBorderWidth: 0 0 0 4px;\r\n\r\n/// Box shadow of a toast message\r\n/// @group message\r\n$toastShadow: none;\r\n\r\n/// Opacity of a toast message\r\n/// @group message\r\n$toastOpacity: .9;\r\n\r\n/// Font weight of a toast message title text\r\n/// @group message\r\n$toastTitleFontWeight: 700;\r\n\r\n/// Margin of a toast message detail text\r\n/// @group message\r\n$toastDetailMargin: 0;\r\n\r\n/// Background of an info message\r\n/// @group message\r\n$infoMessageBg: #039BE5;\r\n\r\n/// Border of an info message\r\n/// @group message\r\n$infoMessageBorder: solid #027cb7;\r\n\r\n/// Text color of an info message\r\n/// @group message\r\n$infoMessageTextColor: #ffffff;\r\n\r\n/// Icon color of an info message\r\n/// @group message\r\n$infoMessageIconColor: #ffffff;\r\n\r\n/// Background of a success message\r\n/// @group message\r\n$successMessageBg: #F0FDF4;\r\n\r\n/// Border of a success message\r\n/// @group message\r\n$successMessageBorder: 0 none;\r\n\r\n/// Text color of a success message\r\n/// @group message\r\n$successMessageTextColor: #22C55E;\r\n\r\n/// Icon color of a success message\r\n/// @group message\r\n$successMessageIconColor: #22C55E;\r\n\r\n/// Background of a warning message\r\n/// @group message\r\n$warningMessageBg: #fff2d5;\r\n\r\n/// Border of a warning message\r\n/// @group message\r\n$warningMessageBorder: 0 none;\r\n\r\n/// Text color of a warning message\r\n/// @group message\r\n$warningMessageTextColor: #ffa600;\r\n\r\n/// Icon color of a warning message\r\n/// @group message\r\n$warningMessageIconColor: $textColor;\r\n\r\n/// Background of an error message\r\n/// @group message\r\n$errorMessageBg: #ffd1d1;\r\n\r\n/// Border of an error message\r\n/// @group message\r\n$errorMessageBorder: 0 none;\r\n\r\n/// Text color of an error message\r\n/// @group message\r\n$errorMessageTextColor: #E53935;\r\n\r\n/// Icon color of an error message\r\n/// @group message\r\n$errorMessageIconColor: #E53935;\r\n","/// Font of the theme\r\n/// @group general\r\n$fontFamily: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n\r\n/// Size of the font\r\n/// @group general\r\n$fontSize: 1rem;\r\n\r\n/// Thickness of the texts\r\n/// @group general\r\n$fontWeight: normal;\r\n\r\n/// Primary text color\r\n/// @group general\r\n$textColor: #495057;\r\n\r\n/// Secondary text color\r\n/// @group general\r\n$textSecondaryColor: #6c757d;\r\n\r\n/// Background of a highlighted item\r\n/// @group general\r\n$highlightBg: $primaryColor;\r\n\r\n/// Text color of a highlighted item\r\n/// @group general\r\n$highlightTextColor: $primaryTextColor;\r\n\r\n/// Background of a highlighted item in focus state\r\n/// @group general\r\n$highlightFocusBg: rgba($primaryColor, .24) !default;\r\n\r\n/// Radius of the corners\r\n/// @group general\r\n$borderRadius: 4px;\r\n\r\n/// Duration of the property transitions\r\n/// @group general\r\n$transitionDuration: .2s;\r\n\r\n/// Properties of a form element transition\r\n/// @group general\r\n$formElementTransition: background-color $transitionDuration, color $transitionDuration, border-color $transitionDuration, box-shadow $transitionDuration;\r\n\r\n/// Properties of a action icon transition\r\n/// @group general\r\n$actionIconTransition: background-color $transitionDuration, color $transitionDuration, box-shadow $transitionDuration;\r\n\r\n/// Properties of a list item transition\r\n/// @group general\r\n$listItemTransition: background-color $transitionDuration, border-color $transitionDuration, box-shadow $transitionDuration;\r\n\r\n/// Size of the Icons\r\n/// @group general\r\n$primeIconFontSize: 1rem;\r\n\r\n/// Separator border\r\n/// @group general\r\n$divider: 1px solid #dee2e6;\r\n\r\n/// Space between two inline items\r\n/// @group general\r\n$inlineSpacing: .5rem;\r\n\r\n/// Opacity of the disabled elements\r\n/// @group general\r\n$disabledOpacity: .6;\r\n\r\n/// Background of the modal layer\r\n/// @group general\r\n$maskBg: rgba(0, 0, 0, 0.4);\r\n\r\n/// Font size of the loading icons\r\n/// @group general\r\n$loadingIconFontSize: 2rem;\r\n\r\n/// Color to use on an invalid element e.g. invalid input\r\n/// @group general\r\n$errorColor: #e4677e;\r\n\r\n/// Outline color of a focused element\r\n/// @group general\r\n$focusOutlineColor: #facfc7;\r\n\r\n/// Outline of a focused element\r\n/// @group general\r\n$focusOutline: 0 none;\r\n\r\n/// Outline offset of a focused element\r\n/// @group general\r\n$focusOutlineOffset: 0;\r\n\r\n/// Outline color of a focused input element\r\n/// @group general\r\n$inputFocusOutlineOffset: $focusOutlineOffset;\r\n\r\n/// Box shadow of a focused element\r\n/// @group general\r\n$focusShadow: 0 0 0 0.2rem $focusOutlineColor;\r\n\r\n/// Width of an action icon\r\n/// @group general\r\n$actionIconWidth: 2rem;\r\n\r\n/// Height of an action icon\r\n/// @group general\r\n$actionIconHeight: 2rem;\r\n\r\n/// Background of an action icon\r\n/// @group general\r\n$actionIconBg: transparent;\r\n\r\n/// Border of an action icon\r\n/// @group general\r\n$actionIconBorder: 0 none;\r\n\r\n/// Color of an action icon\r\n/// @group general\r\n$actionIconColor: $textSecondaryColor;\r\n\r\n/// Backgroun of an action icon in hover state\r\n/// @group general\r\n$actionIconHoverBg: #e9ecef;\r\n\r\n/// Border of an action icon in hover state\r\n/// @group general\r\n$actionIconHoverBorderColor: transparent;\r\n\r\n/// Color of an action icon in hover state\r\n/// @group general\r\n$actionIconHoverColor: $textColor;\r\n\r\n/// Border radius of an action icon\r\n/// @group general\r\n$actionIconBorderRadius: 50%;\r\n\r\n/// Scale factor of small component size\r\n/// @group general\r\n$scaleSM:0.875;\r\n\r\n/// Scale factor of small large size\r\n/// @group general\r\n$scaleLG:1.25;\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 1803:
/*!***********************************************************************************!*\
  !*** ./src/app/home/components/dining-info/dining-info.component.scss?ngResource ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

app-dining-info .container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
  gap: 24px;
}
app-dining-info .container .table-top-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
app-dining-info .container .table-top-service h2 {
  margin: 0;
  font-size: 20px;
}
app-dining-info .container .table-container {
  flex: 1;
  height: 1%;
}
app-dining-info .container .table-container .p-datatable {
  height: 100%;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper {
  height: 100%;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper thead {
  position: sticky;
  top: 0;
  z-index: 2;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper td {
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper td:not(.sticky-left) {
  min-width: 250px;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tbody td {
  background-color: #ffffff;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot {
  position: sticky;
  bottom: 0;
  z-index: 2;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot .course-names .cell-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot .course-names .cell-wrapper .course-name {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot td {
  border-width: 1px 0 0 1px;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot td:last-child {
  border-width: 1px 1px 0 1px;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot td.total {
  border-width: 1px;
  text-align: end;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot td.group-cell {
  border-width: 1px 0 0 1px;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper tfoot .text-right {
  text-align: right;
}
app-dining-info .container .table-container .p-datatable .p-datatable-wrapper .sticky-left {
  position: sticky;
  left: 0;
  z-index: 1;
  min-width: 100px;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/home/components/dining-info/dining-info.component.scss","webpack://./src/themes/mytheme/variables/_data.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AAnCE;EACE,aAAA;EACA,sBAAA;EACA,YAAA;EACA,aAAA;EACA,SAAA;AAsCJ;AApCI;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AAsCN;AApCM;EACE,SAAA;EACA,eAAA;AAsCR;AAlCI;EACE,OAAA;EACA,UAAA;AAoCN;AAlCM;EACE,YAAA;AAoCR;AAlCQ;EACE,YAAA;AAoCV;AAlCU;EACE,gBAAA;EACA,MAAA;EACA,UAAA;AAoCZ;AAjCU;EACE,eAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AAmCZ;AAjCY;EACE,gBAAA;AAmCd;AA9BY;EACE,yBCoGG;ADpEjB;AA5BU;EACE,gBAAA;EACA,SAAA;EACA,UAAA;AA8BZ;AA3Bc;EACE,WAAA;EACA,aAAA;EACA,mBAAA;EACA,QAAA;AA6BhB;AA3BgB;EACE,OAAA;EACA,gBAAA;EACA,mBAAA;EACA,uBAAA;AA6BlB;AAxBY;EACE,yBAAA;AA0Bd;AAxBc;EACE,2BAAA;AA0BhB;AAvBc;EACE,iBAAA;EACA,eAAA;AAyBhB;AAtBc;EACE,yBAAA;AAwBhB;AApBY;EACE,iBAAA;AAsBd;AAlBU;EACE,gBAAA;EACA,OAAA;EACA,UAAA;EACA,gBAAA;AAoBZ","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\napp-dining-info {\r\n  .container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    padding: 32px;\r\n    gap: 24px;\r\n\r\n    .table-top-service {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n\r\n      h2 {\r\n        margin: 0;\r\n        font-size: 20px;\r\n      }\r\n    }\r\n\r\n    .table-container {\r\n      flex: 1;\r\n      height: 1%;\r\n\r\n      .p-datatable {\r\n        height: 100%;\r\n\r\n        .p-datatable-wrapper {\r\n          height: 100%;\r\n\r\n          thead {\r\n            position: sticky;\r\n            top: 0;\r\n            z-index: 2;\r\n          }\r\n\r\n          td {\r\n            max-width: 50px;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n\r\n            &:not(.sticky-left) {\r\n              min-width: 250px;\r\n            }\r\n          }\r\n\r\n          tbody {\r\n            td {\r\n              background-color: var.$tableBodyRowBg;\r\n            }\r\n          }\r\n\r\n          tfoot {\r\n            position: sticky;\r\n            bottom: 0;\r\n            z-index: 2;\r\n\r\n            .course-names {\r\n              .cell-wrapper {\r\n                width: 100%;\r\n                display: flex;\r\n                align-items: center;\r\n                gap: 8px;\r\n\r\n                .course-name {\r\n                  flex: 1;\r\n                  overflow: hidden;\r\n                  white-space: nowrap;\r\n                  text-overflow: ellipsis;\r\n                }\r\n              }\r\n            }\r\n\r\n            td {\r\n              border-width: 1px 0 0 1px;\r\n\r\n              &:last-child {\r\n                border-width: 1px 1px 0 1px;\r\n              }\r\n\r\n              &.total {\r\n                border-width: 1px;\r\n                text-align: end;\r\n              }\r\n\r\n              &.group-cell {\r\n                border-width: 1px 0 0 1px;\r\n              }\r\n            }\r\n\r\n            .text-right {\r\n              text-align: right;\r\n            }\r\n          }\r\n\r\n          .sticky-left {\r\n            position: sticky;\r\n            left: 0;\r\n            z-index: 1;\r\n            min-width: 100px;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n","/// Background of a paginator\r\n/// @group data\r\n$paginatorBg: #ffffff;\r\n\r\n/// Text color of a paginator\r\n/// @group data\r\n$paginatorTextColor: $textSecondaryColor;\r\n\r\n/// Border of a paginator\r\n/// @group data\r\n$paginatorBorder: solid #e9ecef;\r\n\r\n/// Border width of a paginator\r\n/// @group data\r\n$paginatorBorderWidth: 0;\r\n\r\n/// Padding of a paginator\r\n/// @group data\r\n$paginatorPadding: 0.5rem 1rem;\r\n\r\n/// Width of a paginator element\r\n/// @group data\r\n$paginatorElementWidth: $buttonIconOnlyWidth;\r\n\r\n/// Height of a paginator element\r\n/// @group data\r\n$paginatorElementHeight: $buttonIconOnlyWidth;\r\n\r\n/// Background of a paginator element\r\n/// @group data\r\n$paginatorElementBg: transparent;\r\n\r\n/// Border of a paginator element\r\n/// @group data\r\n$paginatorElementBorder: 0 none;\r\n\r\n/// Icon color of a paginator element\r\n/// @group data\r\n$paginatorElementIconColor: $textSecondaryColor;\r\n\r\n/// Background of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBg: #e9ecef;\r\n\r\n/// Border color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBorderColor: transparent;\r\n\r\n/// Icon color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementIconHoverColor: $textSecondaryColor;\r\n\r\n/// Border radius of a paginator element\r\n/// @group data\r\n$paginatorElementBorderRadius: $borderRadius;\r\n\r\n/// Margin of a paginator element\r\n/// @group data\r\n$paginatorElementMargin: 0.143rem;\r\n\r\n/// Padding of a paginator element\r\n/// @group data\r\n$paginatorElementPadding: 0;\r\n\r\n/// Border of a table header\r\n/// @group data\r\n$tableHeaderBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header\r\n/// @group data\r\n$tableHeaderBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header\r\n/// @group data\r\n$tableHeaderBg: #f8f9fa;\r\n\r\n/// Text color of a table header\r\n/// @group data\r\n$tableHeaderTextColor: $textColor;\r\n\r\n/// Font weight of a table header\r\n/// @group data\r\n$tableHeaderFontWeight: 600;\r\n\r\n/// Padding of a table header, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderPadding: 1rem 1rem;\r\n\r\n/// Padding of a table header cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table header cell\r\n/// @group data\r\n$tableHeaderCellBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell\r\n/// @group data\r\n$tableHeaderCellTextColor: $textColor;\r\n\r\n/// Font weight of a table header cell\r\n/// @group data\r\n$tableHeaderCellFontWeight: 600;\r\n\r\n/// Border of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellHoverBg: #e9ecef;\r\n\r\n/// Text color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellTextHoverColor: $textColor;\r\n\r\n/// Icon color of a table header cell\r\n/// @group data\r\n$tableHeaderCellIconColor: $textSecondaryColor;\r\n\r\n/// Icon color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellIconHoverColor: $textSecondaryColor;\r\n\r\n/// Background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextColor: $primaryColor;\r\n\r\n/// Hover background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightHoverBg: #e9ecef;\r\n\r\n/// Hover text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextHoverColor: $primaryColor;\r\n\r\n/// Size of a multiple column sorting order indicator\r\n/// @group data\r\n$tableSortableColumnBadgeSize: 1.143rem;\r\n\r\n/// Background of a table body row\r\n/// @group data\r\n$tableBodyRowBg: #ffffff;\r\n\r\n/// Text color of a table body row\r\n/// @group data\r\n$tableBodyRowTextColor: $textColor;\r\n\r\n/// Background of an even table body row\r\n/// @group data\r\n$tableBodyRowEvenBg: #ffffff;\r\n\r\n/// Background of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowHoverBg: #e9ecef;\r\n\r\n/// Text color of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowTextHoverColor: $textColor;\r\n\r\n/// Border for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorder: 1px solid rgba(0, 0, 0, 0.08);\r\n\r\n/// Border width for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Padding for a cell of a table toby row, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableBodyCellPadding: 1rem 1rem;\r\n\r\n/// Padding of a table footer cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table footer cell\r\n/// @group data\r\n$tableFooterCellBg: #f8f9fa;\r\n\r\n/// Text color of a table footer cell\r\n/// @group data\r\n$tableFooterCellTextColor: $textColor;\r\n\r\n/// Font weight of a table footer cell\r\n/// @group data\r\n$tableFooterCellFontWeight: 600;\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Backgground of a table column resize indicator bar\r\n/// @group data\r\n$tableResizerHelperBg: $primaryColor;\r\n\r\n/// Border of a table footer\r\n/// @group data\r\n$tableFooterBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer\r\n/// @group data\r\n$tableFooterBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table footer\r\n/// @group data\r\n$tableFooterBg: #f8f9fa;\r\n\r\n/// Text color of a table footer\r\n/// @group data\r\n$tableFooterTextColor: $textColor;\r\n\r\n/// Font weight of a table footer\r\n/// @group data\r\n$tableFooterFontWeight: 600;\r\n\r\n/// Padding of a table footer, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterPadding: 1rem 1rem;\r\n\r\n/// Content alignment of a table cell\r\n/// @group data\r\n$tableCellContentAlignment: left;\r\n\r\n/// Border width of a table paginator positioned at top\r\n/// @group data\r\n$tableTopPaginatorBorderWidth: 1px 0 1px 0;\r\n\r\n/// Border width of a table paginator positioned at bottom\r\n/// @group data\r\n$tableBottomPaginatorBorderWidth: 0 0 1px 0;\r\n\r\n/// Scale factor of a small datatable\r\n/// @group data\r\n$tableScaleSM: 0.5;\r\n\r\n/// Scale factor of a large datatable\r\n/// @group data\r\n$tableScaleLG: 1.25;\r\n\r\n/// Padding for content section of a dataview\r\n/// @group data\r\n$dataViewContentPadding: 0;\r\n\r\n/// Border for content section of a dataview\r\n/// @group data\r\n$dataViewContentBorder: 0 none;\r\n\r\n/// Breakpoint of orderlist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$orderListBreakpoint: 769px;\r\n\r\n/// Breakpoint of picklist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$pickListBreakpoint: 769px;\r\n\r\n/// Padding of a tree\r\n/// @group data\r\n$treeContainerPadding: 0.286rem;\r\n\r\n/// Padding of a tree node\r\n/// @group data\r\n$treeNodePadding: 0.143rem;\r\n\r\n/// Padding of a tree node content consists of toggler, icon and label\r\n/// @group data\r\n$treeNodeContentPadding: 0.5rem;\r\n\r\n/// Padding of a tree node children container\r\n/// @group data\r\n$treeNodeChildrenPadding: 0 0 0 1rem;\r\n\r\n/// Color of a treenode data icon, $dataActionIconColor for the toggler element\r\n/// @group data\r\n$treeNodeIconColor: $textSecondaryColor;\r\n\r\n/// Padding of a vertical timeline content element\r\n/// @group data\r\n$timelineVerticalEventContentPadding: 0 1rem;\r\n\r\n/// Padding of a horizontal timeline content element\r\n/// @group data\r\n$timelineHorizontalEventContentPadding: 1rem 0;\r\n\r\n/// Width of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerWidth: 1rem;\r\n\r\n/// Height of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerHeight: 1rem;\r\n\r\n/// Border radius of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorderRadius: 50%;\r\n\r\n/// Border of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorder: 2px solid $highlightBg;\r\n\r\n/// Background of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBackground: $highlightTextColor;\r\n\r\n/// Size of a timeline connector\r\n/// @group data\r\n$timelineEventConnectorSize: 2px;\r\n\r\n/// Color of a timeline event\r\n/// @group data\r\n$timelineEventColor: #dee2e6;\r\n\r\n/// Color of a line to connect to organization chart nodes\r\n/// @group data\r\n$organizationChartConnectorColor: #dee2e6;\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 1226:
/*!****************************************************************************************************************!*\
  !*** ./src/app/home/components/user-menu/components/user-menu-table/user-menu-table.component.scss?ngResource ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

app-user-menu-table .p-tabview {
  height: 100%;
  display: flex;
  flex-direction: column;
}
app-user-menu-table .p-tabview .p-tabview-panels {
  flex: 1;
  overflow: auto;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel {
  height: 100%;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable {
  height: 100%;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper {
  height: 100%;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper .group-header {
  height: 40px;
  background-color: #f8f9fa;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper .group-header td {
  padding: 0;
  text-align: center;
  font-weight: 500;
  color: #D32E16;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper tr:not(.group-header) td {
  height: 56px;
  padding: 0 16px;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper tr:not(.group-header) td span {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper td {
  max-width: 50px;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper td .p-dropdown {
  width: 100%;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper td .p-dropdown .p-overlay {
  max-width: 100%;
}
app-user-menu-table .p-tabview .p-tabview-panels .p-tabview-panel .p-datatable .p-datatable-wrapper td .p-dropdown .p-overlay .p-dropdown-item span {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu-table-dropdown-overlay {
  max-width: 22%;
}
.user-menu-table-dropdown-overlay .dropdown-item {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/home/components/user-menu/components/user-menu-table/user-menu-table.component.scss","webpack://./src/themes/mytheme/variables/_data.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AAnCE;EACE,YAAA;EACA,aAAA;EACA,sBAAA;AAsCJ;AApCI;EACE,OAAA;EACA,cAAA;AAsCN;AApCM;EACE,YAAA;AAsCR;AApCQ;EACE,YAAA;AAsCV;AApCU;EACE,YAAA;AAsCZ;AApCY;EACE,gBAAA;EACA,MAAA;EACA,UAAA;AAsCd;AAnCY;EACE,YAAA;EACA,yBC6CE;ADRhB;AAnCc;EACE,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,cDlCD;ACuEf;AAhCc;EACE,YAAA;EACA,eAAA;AAkChB;AAhCgB;EACE,qBAAA;EACA,WAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;AAkClB;AA7BY;EACE,eAAA;AA+Bd;AA7Bc;EACE,WAAA;AA+BhB;AA7BgB;EACE,eAAA;AA+BlB;AA7BkB;EACE,qBAAA;EACA,eAAA;EACA,gBAAA;EACA,uBAAA;AA+BpB;;AAnBA;EACE,cAAA;AAsBF;AApBE;EACE,qBAAA;EACA,WAAA;EACA,gBAAA;EACA,uBAAA;AAsBJ","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\napp-user-menu-table {\r\n  .p-tabview {\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n\r\n    .p-tabview-panels {\r\n      flex: 1;\r\n      overflow: auto;\r\n\r\n      .p-tabview-panel {\r\n        height: 100%;\r\n\r\n        .p-datatable {\r\n          height: 100%;\r\n\r\n          .p-datatable-wrapper {\r\n            height: 100%;\r\n\r\n            thead {\r\n              position: sticky;\r\n              top: 0;\r\n              z-index: 1;\r\n            }\r\n\r\n            .group-header {\r\n              height: 40px;\r\n              background-color: var.$tableHeaderBg;\r\n\r\n              td {\r\n                padding: 0;\r\n                text-align: center;\r\n                font-weight: 500;\r\n                color: var.$primaryColor;\r\n              }\r\n            }\r\n\r\n            tr:not(.group-header) {\r\n              td {\r\n                height: 56px;\r\n                padding: 0 16px;\r\n\r\n                span {\r\n                  display: inline-block;\r\n                  width: 100%;\r\n                  white-space: nowrap;\r\n                  overflow: hidden;\r\n                  text-overflow: ellipsis;\r\n                }\r\n              }\r\n            }\r\n\r\n            td {\r\n              max-width: 50px;\r\n\r\n              .p-dropdown {\r\n                width: 100%;\r\n\r\n                .p-overlay {\r\n                  max-width: 100%;\r\n\r\n                  .p-dropdown-item span {\r\n                    display: inline-block;\r\n                    max-width: 100%;\r\n                    overflow: hidden;\r\n                    text-overflow: ellipsis;\r\n                  }\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.user-menu-table-dropdown-overlay {\r\n  max-width: 22%;\r\n\r\n  .dropdown-item {\r\n    display: inline-block;\r\n    width: 100%;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n  }\r\n}\r\n","/// Background of a paginator\r\n/// @group data\r\n$paginatorBg: #ffffff;\r\n\r\n/// Text color of a paginator\r\n/// @group data\r\n$paginatorTextColor: $textSecondaryColor;\r\n\r\n/// Border of a paginator\r\n/// @group data\r\n$paginatorBorder: solid #e9ecef;\r\n\r\n/// Border width of a paginator\r\n/// @group data\r\n$paginatorBorderWidth: 0;\r\n\r\n/// Padding of a paginator\r\n/// @group data\r\n$paginatorPadding: 0.5rem 1rem;\r\n\r\n/// Width of a paginator element\r\n/// @group data\r\n$paginatorElementWidth: $buttonIconOnlyWidth;\r\n\r\n/// Height of a paginator element\r\n/// @group data\r\n$paginatorElementHeight: $buttonIconOnlyWidth;\r\n\r\n/// Background of a paginator element\r\n/// @group data\r\n$paginatorElementBg: transparent;\r\n\r\n/// Border of a paginator element\r\n/// @group data\r\n$paginatorElementBorder: 0 none;\r\n\r\n/// Icon color of a paginator element\r\n/// @group data\r\n$paginatorElementIconColor: $textSecondaryColor;\r\n\r\n/// Background of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBg: #e9ecef;\r\n\r\n/// Border color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementHoverBorderColor: transparent;\r\n\r\n/// Icon color of a paginator element in hover state\r\n/// @group data\r\n$paginatorElementIconHoverColor: $textSecondaryColor;\r\n\r\n/// Border radius of a paginator element\r\n/// @group data\r\n$paginatorElementBorderRadius: $borderRadius;\r\n\r\n/// Margin of a paginator element\r\n/// @group data\r\n$paginatorElementMargin: 0.143rem;\r\n\r\n/// Padding of a paginator element\r\n/// @group data\r\n$paginatorElementPadding: 0;\r\n\r\n/// Border of a table header\r\n/// @group data\r\n$tableHeaderBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header\r\n/// @group data\r\n$tableHeaderBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header\r\n/// @group data\r\n$tableHeaderBg: #f8f9fa;\r\n\r\n/// Text color of a table header\r\n/// @group data\r\n$tableHeaderTextColor: $textColor;\r\n\r\n/// Font weight of a table header\r\n/// @group data\r\n$tableHeaderFontWeight: 600;\r\n\r\n/// Padding of a table header, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderPadding: 1rem 1rem;\r\n\r\n/// Padding of a table header cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableHeaderCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table header cell\r\n/// @group data\r\n$tableHeaderCellBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell\r\n/// @group data\r\n$tableHeaderCellTextColor: $textColor;\r\n\r\n/// Font weight of a table header cell\r\n/// @group data\r\n$tableHeaderCellFontWeight: 600;\r\n\r\n/// Border of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table header cell\r\n/// @group data\r\n$tableHeaderCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellHoverBg: #e9ecef;\r\n\r\n/// Text color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellTextHoverColor: $textColor;\r\n\r\n/// Icon color of a table header cell\r\n/// @group data\r\n$tableHeaderCellIconColor: $textSecondaryColor;\r\n\r\n/// Icon color of a table header cell in hover state\r\n/// @group data\r\n$tableHeaderCellIconHoverColor: $textSecondaryColor;\r\n\r\n/// Background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightBg: #f8f9fa;\r\n\r\n/// Text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextColor: $primaryColor;\r\n\r\n/// Hover background of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightHoverBg: #e9ecef;\r\n\r\n/// Hover text color of a table header cell in sorted state\r\n/// @group data\r\n$tableHeaderCellHighlightTextHoverColor: $primaryColor;\r\n\r\n/// Size of a multiple column sorting order indicator\r\n/// @group data\r\n$tableSortableColumnBadgeSize: 1.143rem;\r\n\r\n/// Background of a table body row\r\n/// @group data\r\n$tableBodyRowBg: #ffffff;\r\n\r\n/// Text color of a table body row\r\n/// @group data\r\n$tableBodyRowTextColor: $textColor;\r\n\r\n/// Background of an even table body row\r\n/// @group data\r\n$tableBodyRowEvenBg: #ffffff;\r\n\r\n/// Background of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowHoverBg: #e9ecef;\r\n\r\n/// Text color of a table body row in hover state\r\n/// @group data\r\n$tableBodyRowTextHoverColor: $textColor;\r\n\r\n/// Border for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorder: 1px solid rgba(0, 0, 0, 0.08);\r\n\r\n/// Border width for a cell of a table toby row\r\n/// @group data\r\n$tableBodyCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Padding for a cell of a table toby row, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableBodyCellPadding: 1rem 1rem;\r\n\r\n/// Padding of a table footer cell, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterCellPadding: 1rem 1rem;\r\n\r\n/// Background of a table footer cell\r\n/// @group data\r\n$tableFooterCellBg: #f8f9fa;\r\n\r\n/// Text color of a table footer cell\r\n/// @group data\r\n$tableFooterCellTextColor: $textColor;\r\n\r\n/// Font weight of a table footer cell\r\n/// @group data\r\n$tableFooterCellFontWeight: 600;\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n\r\n/// Border of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer cell\r\n/// @group data\r\n$tableFooterCellBorderWidth: 0 0 1px 0;\r\n\r\n/// Backgground of a table column resize indicator bar\r\n/// @group data\r\n$tableResizerHelperBg: $primaryColor;\r\n\r\n/// Border of a table footer\r\n/// @group data\r\n$tableFooterBorder: 1px solid #e9ecef;\r\n\r\n/// Border width of a table footer\r\n/// @group data\r\n$tableFooterBorderWidth: 0 0 1px 0;\r\n\r\n/// Background of a table footer\r\n/// @group data\r\n$tableFooterBg: #f8f9fa;\r\n\r\n/// Text color of a table footer\r\n/// @group data\r\n$tableFooterTextColor: $textColor;\r\n\r\n/// Font weight of a table footer\r\n/// @group data\r\n$tableFooterFontWeight: 600;\r\n\r\n/// Padding of a table footer, must be defined with a shorthand for vertical and horizontal values e.g. \".5rem .5rem\"\r\n/// @group data\r\n$tableFooterPadding: 1rem 1rem;\r\n\r\n/// Content alignment of a table cell\r\n/// @group data\r\n$tableCellContentAlignment: left;\r\n\r\n/// Border width of a table paginator positioned at top\r\n/// @group data\r\n$tableTopPaginatorBorderWidth: 1px 0 1px 0;\r\n\r\n/// Border width of a table paginator positioned at bottom\r\n/// @group data\r\n$tableBottomPaginatorBorderWidth: 0 0 1px 0;\r\n\r\n/// Scale factor of a small datatable\r\n/// @group data\r\n$tableScaleSM: 0.5;\r\n\r\n/// Scale factor of a large datatable\r\n/// @group data\r\n$tableScaleLG: 1.25;\r\n\r\n/// Padding for content section of a dataview\r\n/// @group data\r\n$dataViewContentPadding: 0;\r\n\r\n/// Border for content section of a dataview\r\n/// @group data\r\n$dataViewContentBorder: 0 none;\r\n\r\n/// Breakpoint of orderlist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$orderListBreakpoint: 769px;\r\n\r\n/// Breakpoint of picklist to alternate between horizontal and vertical layout\r\n/// @group data\r\n$pickListBreakpoint: 769px;\r\n\r\n/// Padding of a tree\r\n/// @group data\r\n$treeContainerPadding: 0.286rem;\r\n\r\n/// Padding of a tree node\r\n/// @group data\r\n$treeNodePadding: 0.143rem;\r\n\r\n/// Padding of a tree node content consists of toggler, icon and label\r\n/// @group data\r\n$treeNodeContentPadding: 0.5rem;\r\n\r\n/// Padding of a tree node children container\r\n/// @group data\r\n$treeNodeChildrenPadding: 0 0 0 1rem;\r\n\r\n/// Color of a treenode data icon, $dataActionIconColor for the toggler element\r\n/// @group data\r\n$treeNodeIconColor: $textSecondaryColor;\r\n\r\n/// Padding of a vertical timeline content element\r\n/// @group data\r\n$timelineVerticalEventContentPadding: 0 1rem;\r\n\r\n/// Padding of a horizontal timeline content element\r\n/// @group data\r\n$timelineHorizontalEventContentPadding: 1rem 0;\r\n\r\n/// Width of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerWidth: 1rem;\r\n\r\n/// Height of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerHeight: 1rem;\r\n\r\n/// Border radius of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorderRadius: 50%;\r\n\r\n/// Border of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBorder: 2px solid $highlightBg;\r\n\r\n/// Background of a timeline marker\r\n/// @group data\r\n$timelineEventMarkerBackground: $highlightTextColor;\r\n\r\n/// Size of a timeline connector\r\n/// @group data\r\n$timelineEventConnectorSize: 2px;\r\n\r\n/// Color of a timeline event\r\n/// @group data\r\n$timelineEventColor: #dee2e6;\r\n\r\n/// Color of a line to connect to organization chart nodes\r\n/// @group data\r\n$organizationChartConnectorColor: #dee2e6;\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 7463:
/*!*******************************************************************************!*\
  !*** ./src/app/home/components/user-menu/user-menu.component.scss?ngResource ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

app-user-menu .user-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
app-user-menu .user-menu-container .user-menu-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 1%;
  flex: 1;
  padding: 32px;
}
app-user-menu .user-menu-container .user-menu-content .user-top-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
app-user-menu .user-menu-container .user-menu-content .user-top-service .user-name, app-user-menu .user-menu-container .user-menu-content .user-top-service .date {
  font-size: 20px;
  font-weight: 600;
}
app-user-menu .user-menu-container .user-menu-content .table-container {
  height: 1%;
  flex: 1;
}
app-user-menu .user-menu-container .user-menu-content .bottom-service {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
app-user-menu .calendar-modal .p-dialog-content {
  padding-bottom: 32px;
}
app-user-menu .calendar-modal .p-dialog-content .fc {
  height: 100% !important;
}
app-user-menu .calendar-modal .p-dialog-content .fc .fc-view-harness {
  height: 1%;
  flex: 1;
}
app-user-menu .calendar-modal .p-dialog-content .fc button {
  background: #D32E16;
  border: none;
  box-shadow: none;
}
app-user-menu .calendar-modal .p-dialog-content .fc button:active {
  background: #c82c13;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/home/components/user-menu/user-menu.component.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AAnCE;EACE,aAAA;EACA,sBAAA;EACA,YAAA;AAsCJ;AApCI;EACE,aAAA;EACA,sBAAA;EACA,SAAA;EACA,UAAA;EACA,OAAA;EACA,aAAA;AAsCN;AApCM;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AAsCR;AApCQ;EACE,eAAA;EACA,gBAAA;AAsCV;AAlCM;EACE,UAAA;EACA,OAAA;AAoCR;AAjCM;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,SAAA;AAmCR;AA7BI;EACE,oBAAA;AA+BN;AA7BM;EACE,uBAAA;AA+BR;AA7BQ;EACE,UAAA;EACA,OAAA;AA+BV;AA5BQ;EACE,mBDrDK;ECsDL,YAAA;EACA,gBAAA;AA8BV;AA5BU;EACE,mBDzDO;ACuFnB","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\napp-user-menu {\r\n  .user-menu-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n\r\n    .user-menu-content {\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 24px;\r\n      height: 1%;\r\n      flex: 1;\r\n      padding: 32px;\r\n\r\n      .user-top-service {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n\r\n        .user-name, .date {\r\n          font-size: 20px;\r\n          font-weight: 600;\r\n        }\r\n      }\r\n\r\n      .table-container {\r\n        height: 1%;\r\n        flex: 1;\r\n      }\r\n\r\n      .bottom-service {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        gap: 16px;\r\n      }\r\n    }\r\n  }\r\n\r\n  .calendar-modal {\r\n    .p-dialog-content {\r\n      padding-bottom: 32px;\r\n\r\n      .fc {\r\n        height: 100% !important;\r\n\r\n        .fc-view-harness {\r\n          height: 1%;\r\n          flex: 1;\r\n        }\r\n\r\n        button {\r\n          background: var.$primaryColor;\r\n          border: none;\r\n          box-shadow: none;\r\n\r\n          &:active {\r\n            background: var.$primaryDarkColor;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 182:
/*!*****************************************************!*\
  !*** ./src/app/home/home.component.scss?ngResource ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.home-container .home-content {
  height: 1%;
  flex: 1;
}`, "",{"version":3,"sources":["webpack://./src/app/home/home.component.scss"],"names":[],"mappings":"AAAA;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;AACF;AACE;EACE,UAAA;EACA,OAAA;AACJ","sourcesContent":[".home-container {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n  .home-content {\r\n    height: 1%;\r\n    flex: 1;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 8241:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/loading-screen/loading-screen.component.scss?ngResource ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.lodading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
}`, "",{"version":3,"sources":["webpack://./src/app/shared/components/loading-screen/loading-screen.component.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,0CAAA;EACA,0BAAA;EACA,WAAA;AACF","sourcesContent":[".lodading-page {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: rgba(255,255,255,0.5);\r\n  backdrop-filter: blur(5px);\r\n  z-index: 10;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 1377:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/toolbar/toolbar.component.scss?ngResource ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 3142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ 5950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --surface-a:#ffffff;
  --surface-b:#f8f9fa;
  --surface-c:#e9ecef;
  --surface-d:#dee2e6;
  --surface-e:#ffffff;
  --surface-f:#ffffff;
  --text-color:#495057;
  --text-color-secondary:#6c757d;
  --primary-color:#2196F3;
  --primary-color-text:#ffffff;
  --surface-0: #ffffff;
  --surface-50: #FAFAFA;
  --surface-100: #F5F5F5;
  --surface-200: #EEEEEE;
  --surface-300: #E0E0E0;
  --surface-400: #BDBDBD;
  --surface-500: #9E9E9E;
  --surface-600: #757575;
  --surface-700: #616161;
  --surface-800: #424242;
  --surface-900: #212121;
  --content-padding:0;
  --inline-spacing:0.5rem;
  --border-radius:4px;
  --surface-ground:#f8f9fa;
  --surface-section:#ffffff;
  --surface-card:#ffffff;
  --surface-overlay:#ffffff;
  --surface-border:#dee2e6;
  --surface-hover:#e9ecef;
  --maskbg: rgba(0, 0, 0, 0.4);
  --highlight-bg: #D32E16;
  --highlight-text-color: #ffffff;
  --focus-ring: 0 0 0 0.2rem #facfc7;
  color-scheme: light;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 32px;
  height: 56px;
  background-color: #D32E16;
}
.toolbar button {
  width: 42px;
  height: 42px;
}`, "",{"version":3,"sources":["webpack://./src/themes/mytheme/_variables.scss","webpack://./src/app/shared/components/toolbar/toolbar.component.scss"],"names":[],"mappings":"AAiCA;EACI,0JAAA;EACA,2JAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,8BAAA;EACA,uBAAA;EACA,4BAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,uBAAA;EACA,4BAAA;EACA,uBAAA;EACA,+BAAA;EACA,kCAAA;EACA,mBAAA;AChCJ;;AApCA;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,kBAAA;EACA,YAAA;EACA,yBDPa;AC8Cf;AArCE;EACE,WAAA;EACA,YAAA;AAuCJ","sourcesContent":["// Theme Specific Variables\r\n$primaryColor: #D32E16;\r\n$primaryDarkColor: #c82c13;\r\n$primaryDarkerColor: #b12311;\r\n$primaryTextColor: #ffffff;\r\n\r\n$colors: (\r\n    \"blue\": #2196F3,\r\n    \"green\": #4caf50,\r\n    \"yellow\": #FBC02D,\r\n    \"cyan\": #00BCD4,\r\n    \"pink\": #E91E63,\r\n    \"indigo\": #3F51B5,\r\n    \"teal\": #009688,\r\n    \"orange\": #F57C00,\r\n    \"bluegray\": #607D8B,\r\n    \"purple\": #9C27B0,\r\n    \"red\": #FF4032,\r\n    \"primary\": $primaryColor\r\n);\r\n\r\n// Mandatory Designer Variables\r\n@import './variables/general';\r\n@import './variables/form';\r\n@import './variables/button';\r\n@import './variables/panel';\r\n@import './variables/_data';\r\n@import './variables/_overlay';\r\n@import './variables/_message';\r\n@import './variables/_menu';\r\n@import './variables/_media';\r\n@import './variables/_misc';\r\n\r\n:root {\r\n    font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n    --surface-a:#ffffff;\r\n    --surface-b:#f8f9fa;\r\n    --surface-c:#e9ecef;\r\n    --surface-d:#dee2e6;\r\n    --surface-e:#ffffff;\r\n    --surface-f:#ffffff;\r\n    --text-color:#495057;\r\n    --text-color-secondary:#6c757d;\r\n    --primary-color:#2196F3;\r\n    --primary-color-text:#ffffff;\r\n    --surface-0: #ffffff;\r\n    --surface-50: #FAFAFA;\r\n    --surface-100: #F5F5F5;\r\n    --surface-200: #EEEEEE;\r\n    --surface-300: #E0E0E0;\r\n    --surface-400: #BDBDBD;\r\n    --surface-500: #9E9E9E;\r\n    --surface-600: #757575;\r\n    --surface-700: #616161;\r\n    --surface-800: #424242;\r\n    --surface-900: #212121;\r\n    --content-padding:#{$panelContentPadding};\r\n    --inline-spacing:#{$inlineSpacing};\r\n    --border-radius:#{$borderRadius};\r\n    --surface-ground:#f8f9fa;\r\n    --surface-section:#ffffff;\r\n    --surface-card:#ffffff;\r\n    --surface-overlay:#ffffff;\r\n    --surface-border:#dee2e6;\r\n    --surface-hover:#e9ecef;\r\n    --maskbg: #{$maskBg};\r\n    --highlight-bg: #{$highlightBg};\r\n    --highlight-text-color: #{$highlightTextColor};\r\n    --focus-ring: #{$focusShadow};\r\n    color-scheme: light;\r\n}\r\n","@use \"themes/mytheme/variables\" as var;\r\n\r\n.toolbar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  padding: 12px 32px;\r\n  height: 56px;\r\n  background-color: var.$primaryColor;\r\n\r\n  button {\r\n    width: 42px;\r\n    height: 42px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 2677:
/*!***********************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/admin-panel.component.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p-tabView [(activeIndex)]=\"_selectedTabIndex\">\r\n  <p-tabPanel header=\"Администрирование меню\">\r\n    <div class=\"tab-content\">\r\n      <app-menu-administration [generalMenu]=\"generalMenu$ | async\"\r\n                               [serviceError]=\"errorSubject$ | async\"\r\n                               (updateMenu)=\"saveGeneralMenu$.next($event)\"\r\n                               (addNewWeek)=\"addNewWeek$.next($event)\"\r\n                               (removeWeek)=\"removeWeek$.next($event)\"\r\n                               (renameWeek)=\"renameWeek$.next($event)\"\r\n                               (changeDishesWithDay)=\"selectedDishesWithDay$.next($event)\">\r\n      </app-menu-administration>\r\n    </div>\r\n  </p-tabPanel>\r\n  <p-tabPanel header=\"Администрирование пользователей\">\r\n    <div class=\"tab-content\">\r\n      <app-users-management [employees]=\"employees$ | async\"\r\n                            [serviceError]=\"errorSubject$ | async\"\r\n                            (addUser)=\"addNewUser$.next($event)\"\r\n                            (removeUser)=\"removeUser$.next($event)\"\r\n                            (editUser)=\"editUser$.next($event)\"\r\n                            (openUserMenu)=\"editSelectedUserMenu$.next($event)\"\r\n                            (passwordChange)=\"changeUserPassword$.next($event)\">\r\n      </app-users-management>\r\n    </div>\r\n  </p-tabPanel>\r\n</p-tabView>\r\n\r\n@if (isLoading$ | async) {\r\n  <app-loading-screen></app-loading-screen>\r\n}\r\n";

/***/ }),

/***/ 6479:
/*!**************************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/menu-administration/menu-administration.component.html?ngResource ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"menu-administration-container\">\r\n  <div class=\"user-top-service\">\r\n    <button pButton (click)=\"openWeekModal()\">Добавить новую неделю</button>\r\n    <div class=\"date\">{{ currentDate$ | async }}</div>\r\n  </div>\r\n\r\n  <div class=\"tabs-container\">\r\n    @if (generalMenu$ | async; as menu) {\r\n\r\n      <p-tabView [(activeIndex)]=\"_currentWeekIndex\" >\r\n        @for (week of menu.weeks; track week.name; let i = $index) {\r\n          <p-tabPanel class=\"menu-tabs\">\r\n            <ng-template pTemplate=\"header\">\r\n              <div class=\"tab-header\" (dblclick)=\"openWeekModal(week)\">\r\n                <span>{{week.displayName}}</span>\r\n                @if (menu.weeks.length > 1) {\r\n                  <i class=\"fi fi-rr-cross-circle\"\r\n                     (click)=\"removeWeekClick$.next(week)\">\r\n                  </i>\r\n                }\r\n              </div>\r\n            </ng-template>\r\n            <p-table #table [value]=\"week.days\"\r\n                     styleClass=\"p-datatable-gridlines\"\r\n                     groupRowsBy=\"name\"\r\n                     rowGroupMode=\"subheader\">\r\n              <ng-template pTemplate=\"header\">\r\n                <tr>\r\n                  <th style=\"width:25%\">\r\n                    <div class=\"header-cell-service\">\r\n                      <span>Первое</span>\r\n                      <button pButton icon=\"fi fi-rr-edit\" (click)=\"openModal(i, 'firstCourse')\"\r\n                              size=\"small\"></button>\r\n                    </div>\r\n                  </th>\r\n                  <th style=\"width:25%\">\r\n                    <div class=\"header-cell-service\">\r\n                      <span>Второе</span>\r\n                      <button pButton icon=\"fi fi-rr-edit\" (click)=\"openModal(i, 'secondCourse')\"\r\n                              size=\"small\"></button>\r\n                    </div>\r\n                  </th>\r\n                  <th style=\"width:25%\">\r\n                    <div class=\"header-cell-service\">\r\n                      <span>Гарнир</span>\r\n                      <button pButton icon=\"fi fi-rr-edit\" (click)=\"openModal(i, 'sideDish')\"\r\n                              size=\"small\"></button>\r\n                    </div>\r\n                  </th>\r\n                  <th style=\"width:25%\">\r\n                    <div class=\"header-cell-service\">\r\n                      <span>Салат</span>\r\n                      <button pButton icon=\"fi fi-rr-edit\" (click)=\"openModal(i, 'salad');\"\r\n                              size=\"small\"></button>\r\n                    </div>\r\n                  </th>\r\n                </tr>\r\n              </ng-template>\r\n              <ng-template pTemplate=\"groupheader\" let-weekDay>\r\n                @if (!!weekDay.meals.firstCourse ||\r\n                !!weekDay.meals.secondCourse ||\r\n                !!weekDay.meals.sideDish ||\r\n                !!weekDay.meals.salad) {\r\n                  <tr pRowGroupHeader class=\"group-header\">\r\n                    <td colspan=\"5\">\r\n                      <span class=\"font-bold ml-2\">{{ weekDay.displayName }}</span>\r\n                    </td>\r\n                  </tr>\r\n                }\r\n              </ng-template>\r\n              <ng-template pTemplate=\"body\" let-weekDay let-rowIndex=\"rowIndex\">\r\n                @for (row of getMaxArrayLength(\r\n                  weekDay.meals.firstCourse,\r\n                  weekDay.meals.secondCourse,\r\n                  weekDay.meals.sideDish,\r\n                  weekDay.meals.salad\r\n                ); track row; let j = $index) {\r\n                  <tr>\r\n                    <td pEditableColumnField=\"firstCourse\"\r\n                        [title]=\"weekDay.meals.firstCourse[j] || ''\">\r\n                      {{ weekDay.meals.firstCourse[j] }}\r\n                    </td>\r\n                    <td pEditableColumnField=\"secondCourse\"\r\n                        [title]=\"weekDay.meals.secondCourse[j] || ''\">\r\n                      {{ weekDay.meals.secondCourse[j] }}\r\n                    </td>\r\n                    <td pEditableColumnField=\"sideDish\"\r\n                        [title]=\"weekDay.meals.sideDish[j] || ''\">\r\n                      {{ weekDay.meals.sideDish[j] }}\r\n                    </td>\r\n                    <td pEditableColumnField=\"salad\"\r\n                        [title]=\"weekDay.meals.salad[j] || ''\">\r\n                      {{ weekDay.meals.salad[j] }}\r\n                    </td>\r\n                  </tr>\r\n                }\r\n              </ng-template>\r\n            </p-table>\r\n          </p-tabPanel>\r\n        }\r\n      </p-tabView>\r\n\r\n      <p-dialog class=\"modal\" [header]=\"(modalHeaderName$ | async)\" [modal]=\"true\"\r\n                [(visible)]=\"isDialogShow\">\r\n        @if (isDialogShow) {\r\n          <div class=\"modal-content\">\r\n            @if (currentDishType$ | async; as dishType) {\r\n              <div class=\"form\">\r\n                <p-dropdown #weekDay\r\n                            placeholder=\"Выберите день недели\"\r\n                            optionValue=\"key\"\r\n                            optionLabel=\"value\"\r\n                            appendTo=\"body\"\r\n                            [options]=\"DAYS_OF_WEEK | keyvalue\"\r\n                            (onChange)=\"selectedDay$.next($event.value)\"/>\r\n\r\n                @if (selectedDay$ | async; as selectedDay) {\r\n                  @for (meal of mealsForm.controls; track meal; let i = $index) {\r\n                    <div class=\"form-field-wrapper\">\r\n                      <p-inputGroup>\r\n                        <input pInputText\r\n                               placeholder=\"Введите название блюда\"\r\n                               [formControl]=\"mealsForm.controls[i]\" />\r\n                        <button type=\"button\" pButton icon=\"fi fi-rr-trash\" (click)=\"removeMeal(i)\"></button>\r\n                      </p-inputGroup>\r\n                      @if (mealsForm.controls[i].getError('whitespace') && mealsForm.controls[i].dirty) {\r\n                        <small>Поле должно быть заполнено</small>\r\n                      }\r\n                    </div>\r\n                  }\r\n\r\n                  <button class=\"add-meal-btn\" pButton text=\"true\"\r\n                          [disabled]=\"mealsForm.controls.length >=5\"\r\n                          (click)=\"addMeal()\"\r\n                          label=\"Добавить блюдо\">\r\n                  </button>\r\n                }\r\n              </div>\r\n\r\n              <div class=\"modal-service\">\r\n                <button pButton label=\"Отмена\" severity=\"secondary\" text=\"true\"\r\n                        [disabled]=\"(isLoading$ | async)\"\r\n                        (click)=\"resetData()\"></button>\r\n                <button pButton\r\n                        style=\"min-width: 110px; justify-content: center\"\r\n                        [disabled]=\"!mealsForm.value.length || mealsForm.invalid || !weekDay.value || (isLoading$ | async)\"\r\n                        (click)=\"updateMenu$.next(menu)\">\r\n                  @if (isLoading$ | async) {\r\n                    <p-progressSpinner [style]=\"{width: '18px', height: '18px'}\" strokeWidth=\"6\"></p-progressSpinner>\r\n                  } @else {\r\n                    Изменить\r\n                  }\r\n                </button>\r\n              </div>\r\n            }\r\n          </div>\r\n        }\r\n      </p-dialog>\r\n\r\n      <p-dialog class=\"modal\"\r\n                modal=\"true\"\r\n                [header]=\"weekModalHeaderName$ | async\"\r\n                [(visible)]=\"isNewWeekDialogShow\"\r\n                (onHide)=\"weekDisplayNameFormControl.reset()\">\r\n        <div class=\"modal-content\">\r\n          <input pInputText placeholder=\"Введите название для новой недели\" [formControl]=\"weekDisplayNameFormControl\">\r\n\r\n          <div class=\"modal-service\">\r\n            <button pButton label=\"Отмена\"\r\n                    severity=\"secondary\"\r\n                    text=\"true\"\r\n                    [disabled]=\"(isLoading$ | async)\"\r\n                    (click)=\"isNewWeekDialogShow = false; weekDisplayNameFormControl.reset()\">\r\n            </button>\r\n            @if ((openModalMode$ | async) === 'new') {\r\n              <button pButton\r\n                      style=\"min-width: 110px; justify-content: center\"\r\n                      [disabled]=\"weekDisplayNameFormControl.invalid || (isLoading$ | async)\"\r\n                      (click)=\"addNewWeekClick$.next()\">\r\n                @if (isLoading$ | async) {\r\n                  <p-progressSpinner [style]=\"{width: '18px', height: '18px'}\" strokeWidth=\"6\"></p-progressSpinner>\r\n                } @else {\r\n                  Добавить\r\n                }\r\n              </button>\r\n            } @else {\r\n              <button pButton\r\n                      style=\"min-width: 110px; justify-content: center\"\r\n                      [disabled]=\"weekDisplayNameFormControl.invalid || (isLoading$ | async)\"\r\n                      (click)=\"renameWeekClick$.next(weekDisplayNameFormControl.value)\">\r\n                @if (isLoading$ | async) {\r\n                  <p-progressSpinner [style]=\"{width: '18px', height: '18px'}\" strokeWidth=\"6\"></p-progressSpinner>\r\n                } @else {\r\n                  Переименовать\r\n                }\r\n              </button>\r\n            }\r\n          </div>\r\n        </div>\r\n      </p-dialog>\r\n\r\n      <p-dialog class=\"calendar-modal\" modal=\"true\" [(visible)]=\"isCalendarDialogShow\" [style]=\"{width: '95%', height: '95%'}\">\r\n        <full-calendar #calendar [options]=\"calendarOptions$ | async\" ></full-calendar>\r\n      </p-dialog>\r\n    } @else {\r\n      <app-loading-screen></app-loading-screen>\r\n    }\r\n\r\n    @if (isLoading$ | async) {\r\n      <app-loading-screen></app-loading-screen>\r\n    }\r\n  </div>\r\n\r\n  <div class=\"bottom-service\">\r\n    <button pButton (click)=\"openCalendarDialog()\">Открыть календарь</button>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 2239:
/*!**************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/personal-menu/personal-menu.component.html?ngResource ***!
  \**************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"user-menu-container\">\r\n  @if (currentUserMenu$ | async; as menu) {\r\n    <div class=\"user-menu-content\">\r\n      <div class=\"user-top-service\">\r\n        <div class=\"user-name\">{{menu.employeeName}}</div>\r\n        <div class=\"date\">{{currentDate$ | async}}</div>\r\n      </div>\r\n\r\n\r\n      <div class=\"table-container\">\r\n        <app-user-menu-table [weeks]=\"menu.weeks\"\r\n                             [generalMenu]=\"generalMenu$ | async\"\r\n                             [currentWeek]=\"currentWeek$ | async\">\r\n        </app-user-menu-table>\r\n      </div>\r\n\r\n      <button style=\"align-self: center\" pButton [disabled]=\"getBtnState(menu, _cachedUserMenu)\" (click)=\"onSave(menu)\">Сохранить изменения</button>\r\n    </div>\r\n  }\r\n</div>\r\n";

/***/ }),

/***/ 4397:
/*!********************************************************************************************************************!*\
  !*** ./src/app/home/components/admin-panel/components/users-management/users-management.component.html?ngResource ***!
  \********************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"users-management-container\">\r\n  @if (employees$ | async; as employees) {\r\n    <div class=\"table-top-service\">\r\n      <h2>Список сотрудников</h2>\r\n\r\n      <p-iconField iconPosition=\"left\" class=\"ml-auto\">\r\n        <p-inputIcon>\r\n          <i class=\"fi fi-rr-search\"></i>\r\n        </p-inputIcon>\r\n        <input #search\r\n               pInputText\r\n               type=\"text\"\r\n               placeholder=\"Поиск\"\r\n               (input)=\"dt2.filterGlobal(search.value, 'contains')\"/>\r\n      </p-iconField>\r\n    </div>\r\n\r\n    <div class=\"table-container\">\r\n      <p-table #dt2\r\n               [value]=\"employees\"\r\n               [globalFilterFields]=\"['fullName', 'role', 'username']\">\r\n        <ng-template pTemplate=\"header\">\r\n          <tr>\r\n            <th style=\"width:50px\" class=\"sticky-left\">№ п/п</th>\r\n            <th style=\"width:20%\">Табельный номер</th>\r\n            <th style=\"width:20%\">ФИО</th>\r\n            <th style=\"width:20%\">Роль</th>\r\n            <th style=\"width:20%\">Статус</th>\r\n            <th style=\"width:50px\" class=\"sticky-right\"></th>\r\n          </tr>\r\n        </ng-template>\r\n        <ng-template pTemplate=\"body\" let-employee let-rowIndex=\"rowIndex\">\r\n          <tr>\r\n            <td class=\"sticky-left\">\r\n              {{ rowIndex + 1 }}\r\n            </td>\r\n            <td>\r\n              {{ employee.username.split('@')[0] }}\r\n            </td>\r\n            <td [pEditableColumn]=\"employee.fullName\" pEditableColumnField=\"fullName\">\r\n              <p-cellEditor>\r\n                <ng-template pTemplate=\"input\">\r\n                  <input pInputText placeholder=\"Введите ФИО сотрудника\"\r\n                         [(ngModel)]=\"employee.fullName\"\r\n                         (change)=\"editUser.emit(employee)\">\r\n                </ng-template>\r\n                <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    {{ employee.fullName }}\r\n                  </span>\r\n                </ng-template>\r\n              </p-cellEditor>\r\n            </td>\r\n            <td>\r\n              {{ employee.role }}\r\n            </td>\r\n            <td [pEditableColumn]=\"employee.status\" pEditableColumnField=\"status\">\r\n              <p-cellEditor>\r\n                <ng-template pTemplate=\"input\">\r\n                  <p-dropdown placeholder=\"Выберите статус\"\r\n                              appendTo=\"body\"\r\n                              optionLabel=\"label\"\r\n                              optionValue=\"value\"\r\n                              [overlayOptions]=\"{styleClass: 'user-menu-table-dropdown-overlay'}\"\r\n                              [options]=\"employeeStatuses\"\r\n                              [(ngModel)]=\"employee.status\"\r\n                              (onChange)=\"editUser.emit(employee)\">\r\n                  </p-dropdown>\r\n                </ng-template>\r\n                <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    <p-tag [class]=\"employee.status\">{{ STATUSES[employee.status] }}</p-tag>\r\n                  </span>\r\n                </ng-template>\r\n              </p-cellEditor>\r\n            </td>\r\n            <td style=\"max-width: 50px\" class=\"sticky-right\">\r\n              <button title=\"Сменить пароль\" pButton icon=\"fi fi-rr-key\"\r\n                      severity=\"secondary\"\r\n                      size=\"large\"\r\n                      style=\"width: 42px; height: 42px\"\r\n                      [rounded]=\"true\"\r\n                      [text]=\"true\"\r\n                      (click)=\"openPasswordModal(employee.id)\">\r\n              </button>\r\n\r\n              @if (employee.role !== \"Dining\" && employee.role !== \"Admin\" ) {\r\n                <button title=\"Редактировать меню пользователя\" pButton icon=\"fi fi-rr-restaurant\"\r\n                        severity=\"secondary\"\r\n                        size=\"large\"\r\n                        style=\"width: 42px; height: 42px\"\r\n                        [rounded]=\"true\"\r\n                        [text]=\"true\"\r\n                        (click)=\"openUserMenu.emit(employee.id)\">\r\n                </button>\r\n              }\r\n\r\n              <button title=\"Удалить пользователя\" pButton icon=\"fi fi-rr-trash\"\r\n                      severity=\"danger\"\r\n                      size=\"large\"\r\n                      style=\"width: 42px; height: 42px\"\r\n                      [rounded]=\"true\"\r\n                      [text]=\"true\"\r\n                      (click)=\"removeUser.emit(employee)\">\r\n              </button>\r\n            </td>\r\n          </tr>\r\n        </ng-template>\r\n      </p-table>\r\n    </div>\r\n\r\n    <button pButton (click)=\"showModal()\">Добавить сотрудника</button>\r\n  } @else {\r\n    <app-loading-screen></app-loading-screen>\r\n  }\r\n</div>\r\n\r\n<p-dialog class=\"modal\"\r\n          [header]=\"'Добавление нового сотрудника'\"\r\n          [modal]=\"true\"\r\n          [(visible)]=\"isDialogShow\"\r\n          (onHide)=\"resetForm()\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"form\">\r\n      <div class=\"form-field-wrapper\">\r\n       <input appOnlyNumber\r\n              pInputText\r\n              placeholder=\"Введите табельный номер сотрудника\"\r\n              [formControl]=\"userFormDto.controls.username\">\r\n        <small>{{ getErrorMessage(userFormDto.controls.username) }}</small>\r\n      </div>\r\n\r\n      <div class=\"form-field-wrapper\">\r\n        <p-iconField iconPosition=\"right\">\r\n          <p-inputIcon style=\"cursor: pointer\"\r\n                       [styleClass]=\"isPasswordShow ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'\"\r\n                       (click)=\"togglePassword()\"/>\r\n          <input [type]=\"isPasswordShow ? 'text' : 'password'\"\r\n                 pInputText placeholder=\"Введите Пароль для сотрудника\" [formControl]=\"userFormDto.controls.password\">\r\n        </p-iconField>\r\n        <small>{{ getErrorMessage(userFormDto.controls.password) }}</small>\r\n      </div>\r\n\r\n      <div class=\"form-field-wrapper\">\r\n        <input pInputText placeholder=\"Введите ФИО сотрудника\" [formControl]=\"userFormDto.controls.fullName\">\r\n        <small>{{ getErrorMessage(userFormDto.controls.fullName) }}</small>\r\n      </div>\r\n\r\n      <div class=\"form-field-wrapper\">\r\n        <p-dropdown\r\n          placeholder=\"Выберите роль сотрудника\"\r\n          appendTo=\"body\"\r\n          [options]=\"['User', 'Admin', 'Dining']\"\r\n          [formControl]=\"userFormDto.controls.role\"/>\r\n        <small>{{ getErrorMessage(userFormDto.controls.role) }}</small>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"modal-service\">\r\n      <button pButton label=\"Отмена\"\r\n              severity=\"secondary\"\r\n              text=\"true\"\r\n              [disabled]=\"isLoading$ | async\"\r\n              (click)=\"isDialogShow = false\"></button>\r\n      <button pButton [disabled]=\"isLoading$ | async\" (click)=\"sendForm()\" style=\"min-width: 110px; justify-content: center\">\r\n        @if (isLoading$ | async) {\r\n          <p-progressSpinner [style]=\"{width: '18px', height: '18px'}\" strokeWidth=\"6\"></p-progressSpinner>\r\n        } @else {\r\n          Добавить\r\n        }\r\n      </button>\r\n    </div>\r\n  </div>\r\n</p-dialog>\r\n\r\n<p-dialog [header]=\"'Новый пароль'\"\r\n          [modal]=\"true\"\r\n          [(visible)]=\"isPasswordDialogShow\"\r\n          (onHide)=\"repeatPasswordControl.reset(); newPasswordControl.reset()\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"form\">\r\n      <div class=\"form-field-wrapper\">\r\n        <p-iconField iconPosition=\"right\">\r\n          <p-inputIcon style=\"cursor: pointer\"\r\n                       [styleClass]=\"isPasswordShow ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'\"\r\n                       (click)=\"togglePassword()\"/>\r\n          <input [type]=\"isPasswordShow ? 'text' : 'password'\"\r\n                 pInputText placeholder=\"Введите новый пароль\" [formControl]=\"newPasswordControl\">\r\n        </p-iconField>\r\n        <small>{{ getErrorMessage(newPasswordControl) }}</small>\r\n      </div>\r\n\r\n      <div class=\"form-field-wrapper\">\r\n        <p-iconField iconPosition=\"right\">\r\n          <p-inputIcon style=\"cursor: pointer\"\r\n                       [styleClass]=\"isPasswordShow ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'\"\r\n                       (click)=\"togglePassword()\"/>\r\n          <input [type]=\"isPasswordShow ? 'text' : 'password'\"\r\n                 pInputText placeholder=\"Повторите пароль\" [formControl]=\"repeatPasswordControl\">\r\n        </p-iconField>\r\n        @if ((newPasswordControl.value !== repeatPasswordControl.value) && repeatPasswordControl.dirty) {\r\n          <small>Пароли должны совпадать</small>\r\n        }\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"modal-service\">\r\n      <button pButton label=\"Отмена\"\r\n              severity=\"secondary\"\r\n              text=\"true\"\r\n              [disabled]=\"isLoading$ | async\"\r\n              (click)=\"isPasswordDialogShow = false\"></button>\r\n      <button pButton (click)=\"changePassword()\" style=\"min-width: 110px; justify-content: center\">\r\n        Изменить\r\n      </button>\r\n    </div>\r\n  </div>\r\n</p-dialog>\r\n";

/***/ }),

/***/ 3485:
/*!***********************************************************************************!*\
  !*** ./src/app/home/components/dining-info/dining-info.component.html?ngResource ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"container\">\r\n\r\n  @if (diningTableData$ | async; as data) {\r\n    @if (!data.isWeekend) {\r\n      <div class=\"table-top-service\">\r\n        <h2>{{ data.currentDate }}</h2>\r\n\r\n        <p-iconField iconPosition=\"left\" class=\"ml-auto\">\r\n          <p-inputIcon>\r\n            <i class=\"fi fi-rr-search\"></i>\r\n          </p-inputIcon>\r\n          <input #search\r\n                 pInputText\r\n                 type=\"text\"\r\n                 placeholder=\"Поиск\"\r\n                 (input)=\"dt.filterGlobal(search.value, 'contains')\"/>\r\n        </p-iconField>\r\n      </div>\r\n\r\n      <div class=\"table-container\">\r\n        <p-table #dt\r\n                 styleClass=\"p-datatable-gridlines\"\r\n                 [value]=\"data.menus\"\r\n                 [globalFilterFields]=\"['employeeName']\">\r\n          <ng-template pTemplate=\"header\">\r\n            <tr>\r\n              <th class=\"sticky-left\">№ п/п</th>\r\n              <th>ФИО</th>\r\n              <th>Первое</th>\r\n              <th>Второе</th>\r\n              <th>Гарнир</th>\r\n              <th>Салат</th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template let-userMenu pTemplate=\"body\" let-rowIndex=\"rowIndex\">\r\n            <tr>\r\n              <td class=\"sticky-left\">{{ rowIndex + 1 }}</td>\r\n              <td [title]=\"userMenu.employeeName\">\r\n                {{ userMenu.employeeName }}\r\n              </td>\r\n              <td [title]=\"userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.firstCourse\">\r\n                {{ userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.firstCourse || 'Нет' }}\r\n              </td>\r\n              <td [title]=\"userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.secondCourse\">\r\n                {{ userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.secondCourse || 'Нет' }}\r\n              </td>\r\n              <td [title]=\"userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.sideDish\">\r\n                {{ userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.sideDish || 'Нет' }}\r\n              </td>\r\n              <td [title]=\"userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.salad\">\r\n                {{ userMenu.weeks[data.weekIndex].days[data.dayIndex].meals.salad || 'Нет' }}\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"footer\">\r\n            <tr>\r\n              <td colspan=\"2\" [attr.rowspan]=\"getMaxFooterRows(data.mealCounts).length + 1\" class=\"group-cell\">Блюда и\r\n                количество\r\n              </td>\r\n            </tr>\r\n            @for (row of getMaxFooterRows(data.mealCounts); track row; let i = $index) {\r\n              <tr class=\"course-names\">\r\n                <td [title]=\"Object.keys(data.mealCounts.firstCourse)[i + 1] || ''\">\r\n                  <div class=\"cell-wrapper\">\r\n                    <span class=\"course-name\">{{ Object.keys(data.mealCounts.firstCourse)[i + 1] }}</span>\r\n                    <span class=\"course-total\">{{ Object.values(data.mealCounts.firstCourse)[i + 1] }}</span>\r\n                  </div>\r\n                </td>\r\n                <td [title]=\"Object.keys(data.mealCounts.secondCourse)[i + 1] || ''\">\r\n                  <div class=\"cell-wrapper\">\r\n                    <span class=\"course-name\">{{ Object.keys(data.mealCounts.secondCourse)[i + 1] }}</span>\r\n                    <span class=\"course-total\">{{ Object.values(data.mealCounts.secondCourse)[i + 1] }}</span>\r\n                  </div>\r\n                </td>\r\n                <td [title]=\"Object.keys(data.mealCounts.sideDish)[i + 1] || ''\">\r\n                  <div class=\"cell-wrapper\">\r\n                    <span class=\"course-name\">{{ Object.keys(data.mealCounts.sideDish)[i + 1] }}</span>\r\n                    <span class=\"course-total\">{{ Object.values(data.mealCounts.sideDish)[i + 1] }}</span>\r\n                  </div>\r\n                </td>\r\n                <td [title]=\"Object.keys(data.mealCounts.salad)[i + 1] || ''\">\r\n                  <div class=\"cell-wrapper\">\r\n                    <span class=\"course-name\">{{ Object.keys(data.mealCounts.salad)[i + 1] }}</span>\r\n                    <span class=\"course-total\">{{ Object.values(data.mealCounts.salad)[i + 1] }}</span>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            }\r\n            <tr class=\"\">\r\n              <td colspan=\"2\">Всего</td>\r\n              <td class=\"text-right\">{{ data.mealCounts.firstCourse.total }}</td>\r\n              <td class=\"text-right\">{{ data.mealCounts.secondCourse.total }}</td>\r\n              <td class=\"text-right\">{{ data.mealCounts.sideDish.total }}</td>\r\n              <td class=\"text-right\">{{ data.mealCounts.salad.total }}</td>\r\n            </tr>\r\n            <tr>\r\n              <td colspan=\"6\" class=\"total text-right\">\r\n                Общее количество комплексных обедов: {{ data.mealCounts.complexMeals.total }}\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      </div>\r\n    } @else {\r\n      <p>Сегодня выходной, отдыхайте!</p>\r\n    }\r\n  } @else {\r\n    <app-loading-screen></app-loading-screen>\r\n  }\r\n</div>\r\n";

/***/ }),

/***/ 9074:
/*!****************************************************************************************************************!*\
  !*** ./src/app/home/components/user-menu/components/user-menu-table/user-menu-table.component.html?ngResource ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p-tabView [(activeIndex)]=\"_currentWeekIndex\">\r\n  @for (week of weeks$ | async; track week; let i = $index) {\r\n    <p-tabPanel [header]=\"week.displayName\" class=\"menu-tabs\">\r\n      @if (generalMenu$ | async; as generalMenu) {\r\n\r\n        <p-table #table [value]=\"week.days\"\r\n                 groupRowsBy=\"name\"\r\n                 rowGroupMode=\"subheader\" (onEditComplete)=\"changeMenu.emit()\">\r\n          <ng-template pTemplate=\"header\">\r\n            <tr>\r\n              <th style=\"width:25%\">\r\n                Первое\r\n              </th>\r\n              <th style=\"width:25%\">\r\n                Второе\r\n              </th>\r\n              <th style=\"width:25%\">\r\n                Гарнир\r\n              </th>\r\n              <th style=\"width:25%\">\r\n                Салат\r\n              </th>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"groupheader\" let-weekDay>\r\n            <tr pRowGroupHeader class=\"group-header\">\r\n              <td colspan=\"5\">\r\n                <span class=\"font-bold ml-2\">{{ weekDay.displayName }}</span>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n          <ng-template pTemplate=\"body\" let-weekDay let-rowIndex=\"rowIndex\">\r\n            <p-blockUI [target]=\"table\" [blocked]=\"week.name === _currentWeek && weekDay.displayName.toLowerCase() === _currentDay && _currentTimeInvalid\">\r\n              <p style=\"color: white; font-size: 28px;\">Выбор блюд доступен до 15:00</p>\r\n            </p-blockUI>\r\n            <tr>\r\n              <td #cell [pEditableColumn]=\"weekDay.meals.firstCourse\" pEditableColumnField=\"firstCourse\">\r\n                <p-cellEditor>\r\n                  <ng-template pTemplate=\"input\">\r\n                    <p-dropdown placeholder=\"Выберите блюдо\"\r\n                                appendTo=\"body\"\r\n                                [disabled]=\"weekDay.meals.salad ==='САЛАТ'\"\r\n                                [overlayOptions]=\"{styleClass: 'user-menu-table-dropdown-overlay'}\"\r\n                                [options]=\"[''].concat(generalMenu.weeks[i].days[rowIndex].meals.firstCourse)\"\r\n                                [(ngModel)]=\"weekDay.meals.firstCourse\">\r\n                      <ng-template let-option pTemplate=\"item\">\r\n                        <span [title]=\"option\" class=\"dropdown-item\">\r\n                          {{ option ? option : \"Нет\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                      <ng-template let-selectedOption pTemplate=\"selectedItem\">\r\n                        <span [title]=\"selectedOption\" class=\"dropdown-item\">\r\n                          {{ selectedOption ? selectedOption : \"\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                    </p-dropdown>\r\n                  </ng-template>\r\n                  <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    {{ weekDay.meals.firstCourse || 'Нет' }}\r\n                  </span>\r\n                  </ng-template>\r\n                </p-cellEditor>\r\n              </td>\r\n              <td [pEditableColumn]=\"weekDay.meals.secondCourse\" pEditableColumnField=\"secondCourse\">\r\n                <p-cellEditor>\r\n                  <ng-template pTemplate=\"input\">\r\n                    <p-dropdown placeholder=\"Выберите блюдо\"\r\n                                appendTo=\"body\"\r\n                                [disabled]=\"weekDay.meals.salad ==='САЛАТ'\"\r\n                                [overlayOptions]=\"{styleClass: 'user-menu-table-dropdown-overlay'}\"\r\n                                [options]=\"[''].concat(generalMenu.weeks[i].days[rowIndex].meals.secondCourse)\"\r\n                                [(ngModel)]=\"weekDay.meals.secondCourse\">\r\n                      <ng-template let-option pTemplate=\"item\">\r\n                        <span [title]=\"option\" class=\"dropdown-item\">\r\n                          {{ option ? option : \"Нет\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                      <ng-template let-selectedOption pTemplate=\"selectedItem\">\r\n                        <span [title]=\"selectedOption\" class=\"dropdown-item\">\r\n                          {{ selectedOption ? selectedOption : \"\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                    </p-dropdown>\r\n                  </ng-template>\r\n                  <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    {{ weekDay.meals.secondCourse || 'Нет' }}\r\n                  </span>\r\n                  </ng-template>\r\n                </p-cellEditor>\r\n              </td>\r\n              <td [pEditableColumn]=\"weekDay.meals.sideDish\" pEditableColumnField=\"sideDish\">\r\n                <p-cellEditor>\r\n                  <ng-template pTemplate=\"input\">\r\n                    <p-dropdown placeholder=\"Выберите блюдо\"\r\n                                appendTo=\"body\"\r\n                                [disabled]=\"weekDay.meals.salad ==='САЛАТ'\"\r\n                                [overlayOptions]=\"{styleClass: 'user-menu-table-dropdown-overlay'}\"\r\n                                [options]=\"[''].concat(generalMenu.weeks[i].days[rowIndex].meals.sideDish)\"\r\n                                [(ngModel)]=\"weekDay.meals.sideDish\">\r\n                      <ng-template let-option pTemplate=\"item\">\r\n                        <span [title]=\"option\" class=\"dropdown-item\">\r\n                          {{ option ? option : \"Нет\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                      <ng-template let-selectedOption pTemplate=\"selectedItem\">\r\n                        <span [title]=\"selectedOption\" class=\"dropdown-item\">\r\n                          {{ selectedOption ? selectedOption : \"\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                    </p-dropdown>\r\n                  </ng-template>\r\n                  <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    {{ weekDay.meals.sideDish || 'Нет' }}\r\n                  </span>\r\n                  </ng-template>\r\n                </p-cellEditor>\r\n              </td>\r\n              <td [pEditableColumn]=\"weekDay.meals.salad\" pEditableColumnField=\"salad\">\r\n                <p-cellEditor>\r\n                  <ng-template pTemplate=\"input\">\r\n                    <p-dropdown placeholder=\"Выберите блюдо\"\r\n                                appendTo=\"body\"\r\n                                [overlayOptions]=\"{styleClass: 'user-menu-table-dropdown-overlay'}\"\r\n                                [options]=\"[''].concat(generalMenu.weeks[i].days[rowIndex].meals.salad)\"\r\n                                [(ngModel)]=\"weekDay.meals.salad\"\r\n                                (ngModelChange)=\"onSaladChange(weekDay, $event)\">\r\n                      <ng-template let-option pTemplate=\"item\">\r\n                        <span [title]=\"option\" class=\"dropdown-item\">\r\n                          {{ option ? option : \"Нет\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                      <ng-template let-selectedOption pTemplate=\"selectedItem\">\r\n                        <span [title]=\"selectedOption\" class=\"dropdown-item\">\r\n                          {{ selectedOption ? selectedOption : \"\" }}\r\n                        </span>\r\n                      </ng-template>\r\n                    </p-dropdown>\r\n                  </ng-template>\r\n                  <ng-template pTemplate=\"output\">\r\n                  <span>\r\n                    {{ weekDay.meals.salad || 'Нет' }}\r\n                  </span>\r\n                  </ng-template>\r\n                </p-cellEditor>\r\n              </td>\r\n            </tr>\r\n          </ng-template>\r\n        </p-table>\r\n      } @else {\r\n        Основное меню не составлено\r\n      }\r\n    </p-tabPanel>\r\n  }\r\n</p-tabView>\r\n";

/***/ }),

/***/ 609:
/*!*******************************************************************************!*\
  !*** ./src/app/home/components/user-menu/user-menu.component.html?ngResource ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"user-menu-container\">\r\n  @if (currentUserMenu$ | async; as menu) {\r\n    <div class=\"user-menu-content\">\r\n      <div class=\"user-top-service\">\r\n        <div class=\"user-name\">{{menu.employeeName}}</div>\r\n        <div class=\"date\">{{currentDate$ | async}}</div>\r\n      </div>\r\n\r\n\r\n      <div class=\"table-container\">\r\n        <app-user-menu-table [weeks]=\"menu.weeks\"\r\n                             [generalMenu]=\"generalMenu$ | async\"\r\n                             [currentWeek]=\"currentWeek$ | async\">\r\n        </app-user-menu-table>\r\n      </div>\r\n\r\n      <div class=\"bottom-service\">\r\n        <button pButton (click)=\"openCalendarDialog()\">Открыть календарь</button>\r\n        <button pButton [disabled]=\"getBtnState(menu, _cachedUserMenu)\" (click)=\"saveMenuBtnClick$.next(menu)\">Сохранить изменения</button>\r\n      </div>\r\n    </div>\r\n  } @else {\r\n    <app-loading-screen></app-loading-screen>\r\n  }\r\n</div>\r\n\r\n@if (calendarOptions$ | async; as options) {\r\n  <p-dialog class=\"calendar-modal\" modal=\"true\" [(visible)]=\"isCalendarDialogShow\" [style]=\"{width: '95%', height: '95%'}\">\r\n    <full-calendar #calendar [options]=\"options\" ></full-calendar>\r\n  </p-dialog>\r\n}\r\n";

/***/ }),

/***/ 1144:
/*!*****************************************************!*\
  !*** ./src/app/home/home.component.html?ngResource ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"home-container\">\r\n  <app-toolbar></app-toolbar>\r\n\r\n  <div class=\"home-content\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ 9751:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/components/loading-screen/loading-screen.component.html?ngResource ***!
  \*******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"lodading-page\">\r\n  <p-progressSpinner\r\n    styleClass=\"w-4rem h-4rem\"\r\n    strokeWidth=\"8\"\r\n    animationDuration=\".5s\" />\r\n</div>\r\n";

/***/ }),

/***/ 7367:
/*!*****************************************************************************!*\
  !*** ./src/app/shared/components/toolbar/toolbar.component.html?ngResource ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<div class=\"toolbar\">\r\n  <img src=\"assets/toolbar-logo.svg\" alt=\"logo\" class=\"toolbar-logo\">\r\n\r\n  <button pButton icon=\"fi fi-br-exit\" size=\"large\" (click)=\"logout$.next()\" rounded=\"true\"></button>\r\n</div>\r\n";

/***/ }),

/***/ 7997:
/*!******************************************************************************!*\
  !*** ./node_modules/@fullcalendar/angular/fesm2020/fullcalendar-angular.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FullCalendarComponent: () => (/* binding */ FullCalendarComponent),
/* harmony export */   FullCalendarModule: () => (/* binding */ FullCalendarModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/core */ 6633);
/* harmony import */ var _fullcalendar_core_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/core/internal */ 3436);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);






const _c0 = ["*"];
const _c1 = ["rootEl"];
const _c2 = a0 => ({
  $implicit: a0
});
function TransportContainerComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 2, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
const _c3 = ["dayHeaderContent"];
const _c4 = ["dayCellContent"];
const _c5 = ["weekNumberContent"];
const _c6 = ["nowIndicatorContent"];
const _c7 = ["eventContent"];
const _c8 = ["slotLaneContent"];
const _c9 = ["slotLabelContent"];
const _c10 = ["allDayContent"];
const _c11 = ["moreLinkContent"];
const _c12 = ["noEventsContent"];
const _c13 = ["resourceAreaHeaderContent"];
const _c14 = ["resourceGroupLabelContent"];
const _c15 = ["resourceLabelContent"];
const _c16 = ["resourceLaneContent"];
const _c17 = ["resourceGroupLaneContent"];
function FullCalendarComponent_transport_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "transport-container", 1);
  }
  if (rf & 2) {
    const customRendering_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("inPlaceOf", customRendering_r1.containerEl)("reportEl", customRendering_r1.reportNewContainerEl)("elTag", customRendering_r1.elTag)("elClasses", customRendering_r1.elClasses)("elStyle", customRendering_r1.elStyle)("elAttrs", customRendering_r1.elAttrs)("template", ctx_r1.templateMap[customRendering_r1.generatorName])("renderProps", customRendering_r1.renderProps);
  }
}
const OPTION_IS_DEEP = {
  headerToolbar: true,
  footerToolbar: true,
  events: true,
  eventSources: true,
  resources: true
};
/*
NOTE: keep synced with component
*/
const OPTION_INPUT_NAMES = ['events', 'eventSources', 'resources'];
const hasOwnProperty = Object.prototype.hasOwnProperty;
/*
Really simple clone utility. Only copies plain arrays, objects, and Dates. Transfers everything else as-is.
Wanted to use a third-party lib, but none did exactly this.
*/
function deepCopy(input) {
  if (Array.isArray(input)) {
    return input.map(deepCopy);
  } else if (input instanceof Date) {
    return new Date(input.valueOf());
  } else if (typeof input === 'object' && input) {
    // non-null object
    return mapHash(input, deepCopy);
  } else {
    // everything else (null, function, etc)
    return input;
  }
}
function mapHash(input, func) {
  const output = {};
  for (const key in input) {
    if (hasOwnProperty.call(input, key)) {
      output[key] = func(input[key], key);
    }
  }
  return output;
}

/*
Forked from https://github.com/epoberezkin/fast-deep-equal (also has MIT license)
Needed ESM support or else Angular complains about treeshaking
(https://github.com/fullcalendar/fullcalendar-angular/issues/421)
*/
function deepEqual(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  // true if both NaN, false otherwise
  return a !== a && b !== b;
}
const dummyContainer$1 = typeof document !== 'undefined' ? document.createDocumentFragment() : null;
class OffscreenFragmentComponent {
  constructor(element) {
    this.element = element;
  }
  ngAfterViewInit() {
    if (dummyContainer$1) {
      dummyContainer$1.appendChild(this.element.nativeElement);
    }
  }
  // invoked BEFORE component removed from DOM
  ngOnDestroy() {
    if (dummyContainer$1) {
      dummyContainer$1.removeChild(this.element.nativeElement);
    }
  }
}
OffscreenFragmentComponent.ɵfac = function OffscreenFragmentComponent_Factory(t) {
  return new (t || OffscreenFragmentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
OffscreenFragmentComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: OffscreenFragmentComponent,
  selectors: [["offscreen-fragment"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function OffscreenFragmentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OffscreenFragmentComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'offscreen-fragment',
      template: '<ng-content></ng-content>',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
const dummyContainer = typeof document !== 'undefined' ? document.createDocumentFragment() : null;
class TransportContainerComponent {
  ngAfterViewInit() {
    var _this$rootElRef;
    const rootEl = (_this$rootElRef = this.rootElRef) === null || _this$rootElRef === void 0 ? void 0 : _this$rootElRef.nativeElement; // assumed defined
    replaceEl(rootEl, this.inPlaceOf);
    applyElAttrs(rootEl, undefined, this.elAttrs);
    // insurance for if Preact recreates and reroots inPlaceOf element
    this.inPlaceOf.style.display = 'none';
    this.reportEl(rootEl);
  }
  ngOnChanges(changes) {
    var _this$rootElRef2;
    const rootEl = (_this$rootElRef2 = this.rootElRef) === null || _this$rootElRef2 === void 0 ? void 0 : _this$rootElRef2.nativeElement;
    // ngOnChanges is called before ngAfterViewInit (and before DOM initializes)
    // so make sure rootEl is defined before doing anything
    if (rootEl) {
      // If the ContentContainer's tagName changed, it will create a new DOM element in its
      // original place. Detect this and re-replace.
      if (this.inPlaceOf.parentNode !== dummyContainer) {
        replaceEl(rootEl, this.inPlaceOf);
        applyElAttrs(rootEl, undefined, this.elAttrs);
        this.reportEl(rootEl);
      } else {
        const elAttrsChange = changes['elAttrs'];
        if (elAttrsChange) {
          applyElAttrs(rootEl, elAttrsChange.previousValue, elAttrsChange.currentValue);
        }
      }
    }
  }
  // invoked BEFORE component removed from DOM
  ngOnDestroy() {
    if (
    // protect against Preact recreating and rerooting inPlaceOf element
    this.inPlaceOf.parentNode === dummyContainer && dummyContainer) {
      dummyContainer.removeChild(this.inPlaceOf);
    }
    this.reportEl(null);
  }
}
TransportContainerComponent.ɵfac = function TransportContainerComponent_Factory(t) {
  return new (t || TransportContainerComponent)();
};
TransportContainerComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TransportContainerComponent,
  selectors: [["transport-container"]],
  viewQuery: function TransportContainerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.rootElRef = _t.first);
    }
  },
  inputs: {
    inPlaceOf: "inPlaceOf",
    reportEl: "reportEl",
    elTag: "elTag",
    elClasses: "elClasses",
    elStyle: "elStyle",
    elAttrs: "elAttrs",
    template: "template",
    renderProps: "renderProps"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 6,
  vars: 6,
  consts: [["rootEl", ""], [3, "ngIf"], [3, "ngClass", "ngStyle"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function TransportContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TransportContainerComponent_ng_template_0_Template, 3, 6, "ng-template", 1)(1, TransportContainerComponent_ng_template_1_Template, 3, 6, "ng-template", 1)(2, TransportContainerComponent_ng_template_2_Template, 3, 6, "ng-template", 1)(3, TransportContainerComponent_ng_template_3_Template, 3, 6, "ng-template", 1)(4, TransportContainerComponent_ng_template_4_Template, 3, 6, "ng-template", 1)(5, TransportContainerComponent_ng_template_5_Template, 3, 6, "ng-template", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "a");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "td");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TransportContainerComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'transport-container',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      template: "<ng-template [ngIf]=\"elTag == 'div'\">\n  <div #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </div>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'span'\">\n  <span #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </span>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'a'\">\n  <a #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </a>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'tr'\">\n  <tr #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </tr>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'th'\">\n  <th #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </th>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'td'\">\n  <td #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </td>\n</ng-template>\n"
    }]
  }], null, {
    inPlaceOf: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    reportEl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elTag: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elClasses: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elAttrs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    template: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    renderProps: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    rootElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['rootEl']
    }]
  });
})();
function replaceEl(subject, inPlaceOf) {
  var _inPlaceOf$parentNode;
  (_inPlaceOf$parentNode = inPlaceOf.parentNode) === null || _inPlaceOf$parentNode === void 0 || _inPlaceOf$parentNode.insertBefore(subject, inPlaceOf.nextSibling);
  if (dummyContainer) {
    dummyContainer.appendChild(inPlaceOf);
  }
}
function applyElAttrs(el, previousAttrs = {}, currentAttrs = {}) {
  // these are called "attributes" but they manipulate DOM node *properties*
  for (const attrName in previousAttrs) {
    if (!(attrName in currentAttrs)) {
      el[attrName] = null;
    }
  }
  for (const attrName in currentAttrs) {
    el[attrName] = currentAttrs[attrName];
  }
}
class FullCalendarComponent {
  constructor(element, changeDetector) {
    this.element = element;
    this.calendar = null;
    this.optionSnapshot = {}; // for diffing
    this.customRenderingMap = new Map();
    this.templateMap = {};
    const customRenderingStore = new _fullcalendar_core_internal__WEBPACK_IMPORTED_MODULE_2__.cy();
    customRenderingStore.subscribe(customRenderingMap => {
      this.customRenderingMap = customRenderingMap;
      this.customRenderingArray = undefined; // clear cache
      changeDetector.detectChanges();
    });
    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
    this.templateMap = this; // alias to this
  }
  ngAfterViewInit() {
    const {
      deepChangeDetection
    } = this;
    const options = {
      ...this.options,
      ...this.buildInputOptions()
    };
    // initialize snapshot
    this.optionSnapshot = mapHash(options, (optionVal, optionName) => deepChangeDetection && OPTION_IS_DEEP[optionName] ? deepCopy(optionVal) : optionVal);
    const calendarEl = this.element.nativeElement;
    const calendar = this.calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_3__.Calendar(calendarEl, {
      ...options,
      ...this.buildExtraOptions()
    });
    // Ionic dimensions hack
    // https://github.com/fullcalendar/fullcalendar/issues/4976
    const ionContent = calendarEl.closest('ion-content');
    if (ionContent && ionContent.componentOnReady) {
      ionContent.componentOnReady().then(() => {
        window.requestAnimationFrame(() => {
          calendar.render();
        });
      });
    } else {
      calendar.render();
    }
  }
  /*
  allows us to manually detect complex input changes, internal mutations to certain options.
  called before ngOnChanges. called much more often than ngOnChanges.
  */
  ngDoCheck() {
    if (this.calendar) {
      // not the initial render
      const {
        deepChangeDetection,
        optionSnapshot
      } = this;
      const newOptions = {
        ...this.options,
        ...this.buildInputOptions()
      };
      const newProcessedOptions = {};
      const changedOptionNames = [];
      // detect adds and updates (and update snapshot)
      for (const optionName in newOptions) {
        if (newOptions.hasOwnProperty(optionName)) {
          let optionVal = newOptions[optionName];
          if (deepChangeDetection && OPTION_IS_DEEP[optionName]) {
            if (!deepEqual(optionSnapshot[optionName], optionVal)) {
              optionSnapshot[optionName] = deepCopy(optionVal);
              changedOptionNames.push(optionName);
            }
          } else {
            if (optionSnapshot[optionName] !== optionVal) {
              optionSnapshot[optionName] = optionVal;
              changedOptionNames.push(optionName);
            }
          }
          newProcessedOptions[optionName] = optionVal;
        }
      }
      const oldOptionNames = Object.keys(optionSnapshot);
      // detect removals (and update snapshot)
      for (const optionName of oldOptionNames) {
        if (!(optionName in newOptions)) {
          // doesn't exist in new options?
          delete optionSnapshot[optionName];
          changedOptionNames.push(optionName);
        }
      }
      if (changedOptionNames.length) {
        this.calendar.pauseRendering();
        this.calendar.resetOptions({
          ...newProcessedOptions,
          ...this.buildExtraOptions()
        }, changedOptionNames);
      }
    }
  }
  ngAfterContentChecked() {
    if (this.calendar) {
      // too defensive?
      this.calendar.resumeRendering();
    }
  }
  ngOnDestroy() {
    if (this.calendar) {
      // too defensive?
      this.calendar.destroy();
      this.calendar = null;
    }
  }
  get customRenderings() {
    return this.customRenderingArray || (this.customRenderingArray = [...this.customRenderingMap.values()]);
  }
  getApi() {
    return this.calendar;
  }
  buildInputOptions() {
    const options = {};
    for (const inputName of OPTION_INPUT_NAMES) {
      const inputValue = this[inputName];
      if (inputValue != null) {
        // exclude both null and undefined
        options[inputName] = inputValue;
      }
    }
    return options;
  }
  buildExtraOptions() {
    return {
      handleCustomRendering: this.handleCustomRendering,
      customRenderingMetaMap: this.templateMap,
      customRenderingReplaces: true
    };
  }
  // for `trackBy` in loop
  trackCustomRendering(index, customRendering) {
    return customRendering.id;
  }
}
FullCalendarComponent.ɵfac = function FullCalendarComponent_Factory(t) {
  return new (t || FullCalendarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
FullCalendarComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FullCalendarComponent,
  selectors: [["full-calendar"]],
  contentQueries: function FullCalendarComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c3, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c4, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c5, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c7, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c8, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c9, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c10, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c11, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c12, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c13, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c14, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c15, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c16, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c17, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dayHeaderContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dayCellContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.weekNumberContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.nowIndicatorContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.eventContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.slotLaneContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.slotLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.allDayContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.moreLinkContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.noEventsContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceAreaHeaderContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceGroupLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceLaneContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceGroupLaneContent = _t.first);
    }
  },
  inputs: {
    options: "options",
    deepChangeDetection: "deepChangeDetection",
    events: "events",
    eventSources: "eventSources",
    resources: "resources"
  },
  decls: 2,
  vars: 2,
  consts: [[3, "inPlaceOf", "reportEl", "elTag", "elClasses", "elStyle", "elAttrs", "template", "renderProps", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "inPlaceOf", "reportEl", "elTag", "elClasses", "elStyle", "elAttrs", "template", "renderProps"]],
  template: function FullCalendarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "offscreen-fragment");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FullCalendarComponent_transport_container_1_Template, 1, 8, "transport-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.customRenderings)("ngForTrackBy", ctx.trackCustomRendering);
    }
  },
  dependencies: [OffscreenFragmentComponent, TransportContainerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FullCalendarComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'full-calendar',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None // the styles are root-level, not scoped within the component
      ,
      template: "<offscreen-fragment>\n  <transport-container *ngFor=\"let customRendering of customRenderings; trackBy:trackCustomRendering\"\n    [inPlaceOf]=\"customRendering.containerEl\"\n    [reportEl]=\"customRendering.reportNewContainerEl\"\n    [elTag]=\"customRendering.elTag\"\n    [elClasses]=\"customRendering.elClasses\"\n    [elStyle]=\"customRendering.elStyle\"\n    [elAttrs]=\"customRendering.elAttrs\"\n    [template]=\"templateMap[customRendering.generatorName]!\"\n    [renderProps]=\"customRendering.renderProps\"\n  ></transport-container>\n</offscreen-fragment>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    deepChangeDetection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    events: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    eventSources: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    resources: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dayHeaderContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['dayHeaderContent', {
        static: true
      }]
    }],
    dayCellContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['dayCellContent', {
        static: true
      }]
    }],
    weekNumberContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['weekNumberContent', {
        static: true
      }]
    }],
    nowIndicatorContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['nowIndicatorContent', {
        static: true
      }]
    }],
    eventContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['eventContent', {
        static: true
      }]
    }],
    slotLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['slotLaneContent', {
        static: true
      }]
    }],
    slotLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['slotLabelContent', {
        static: true
      }]
    }],
    allDayContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['allDayContent', {
        static: true
      }]
    }],
    moreLinkContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['moreLinkContent', {
        static: true
      }]
    }],
    noEventsContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['noEventsContent', {
        static: true
      }]
    }],
    resourceAreaHeaderContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceAreaHeaderContent', {
        static: true
      }]
    }],
    resourceGroupLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceGroupLabelContent', {
        static: true
      }]
    }],
    resourceLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceLabelContent', {
        static: true
      }]
    }],
    resourceLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceLaneContent', {
        static: true
      }]
    }],
    resourceGroupLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceGroupLaneContent', {
        static: true
      }]
    }]
  });
})();
class FullCalendarModule {}
FullCalendarModule.ɵfac = function FullCalendarModule_Factory(t) {
  return new (t || FullCalendarModule)();
};
FullCalendarModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FullCalendarModule,
  declarations: [FullCalendarComponent, OffscreenFragmentComponent, TransportContainerComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
  exports: [FullCalendarComponent]
});
FullCalendarModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FullCalendarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [FullCalendarComponent, OffscreenFragmentComponent, TransportContainerComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
      exports: [FullCalendarComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of lib
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 6633:
/*!**************************************************!*\
  !*** ./node_modules/@fullcalendar/core/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calendar: () => (/* binding */ Calendar),
/* harmony export */   JsonRequestError: () => (/* reexport safe */ _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ag),
/* harmony export */   createPlugin: () => (/* binding */ createPlugin),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatRange: () => (/* binding */ formatRange),
/* harmony export */   globalLocales: () => (/* binding */ globalLocales),
/* harmony export */   globalPlugins: () => (/* binding */ globalPlugins),
/* harmony export */   sliceEvents: () => (/* binding */ sliceEvents),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _internal_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal-common.js */ 3436);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ 8048);
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact/compat */ 174);




const globalLocales = [];
const MINIMAL_RAW_EN_LOCALE = {
  code: 'en',
  week: {
    dow: 0,
    doy: 4 // 4 days need to be within the year to be considered the first week
  },
  direction: 'ltr',
  buttonText: {
    prev: 'prev',
    next: 'next',
    prevYear: 'prev year',
    nextYear: 'next year',
    year: 'year',
    today: 'today',
    month: 'month',
    week: 'week',
    day: 'day',
    list: 'list'
  },
  weekText: 'W',
  weekTextLong: 'Week',
  closeHint: 'Close',
  timeHint: 'Time',
  eventHint: 'Event',
  allDayText: 'all-day',
  moreLinkText: 'more',
  noEventsText: 'No events to display'
};
const RAW_EN_LOCALE = Object.assign(Object.assign({}, MINIMAL_RAW_EN_LOCALE), {
  // Includes things we don't want other locales to inherit,
  // things that derive from other translatable strings.
  buttonHints: {
    prev: 'Previous $0',
    next: 'Next $0',
    today(buttonText, unit) {
      return unit === 'day' ? 'Today' : `This ${buttonText}`;
    }
  },
  viewHint: '$0 view',
  navLinkHint: 'Go to $0',
  moreLinkHint(eventCnt) {
    return `Show ${eventCnt} more event${eventCnt === 1 ? '' : 's'}`;
  }
});
function organizeRawLocales(explicitRawLocales) {
  let defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en';
  let allRawLocales = globalLocales.concat(explicitRawLocales);
  let rawLocaleMap = {
    en: RAW_EN_LOCALE
  };
  for (let rawLocale of allRawLocales) {
    rawLocaleMap[rawLocale.code] = rawLocale;
  }
  return {
    map: rawLocaleMap,
    defaultCode
  };
}
function buildLocale(inputSingular, available) {
  if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
    return parseLocale(inputSingular.code, [inputSingular.code], inputSingular);
  }
  return queryLocale(inputSingular, available);
}
function queryLocale(codeArg, available) {
  let codes = [].concat(codeArg || []); // will convert to array
  let raw = queryRawLocale(codes, available) || RAW_EN_LOCALE;
  return parseLocale(codeArg, codes, raw);
}
function queryRawLocale(codes, available) {
  for (let i = 0; i < codes.length; i += 1) {
    let parts = codes[i].toLocaleLowerCase().split('-');
    for (let j = parts.length; j > 0; j -= 1) {
      let simpleId = parts.slice(0, j).join('-');
      if (available[simpleId]) {
        return available[simpleId];
      }
    }
  }
  return null;
}
function parseLocale(codeArg, codes, raw) {
  let merged = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.m)([MINIMAL_RAW_EN_LOCALE, raw], ['buttonText']);
  delete merged.code; // don't want this part of the options
  let {
    week
  } = merged;
  delete merged.week;
  return {
    codeArg,
    codes,
    week,
    simpleNumberFormat: new Intl.NumberFormat(codeArg),
    options: merged
  };
}

// TODO: easier way to add new hooks? need to update a million things
function createPlugin(input) {
  return {
    id: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.g)(),
    name: input.name,
    premiumReleaseDate: input.premiumReleaseDate ? new Date(input.premiumReleaseDate) : undefined,
    deps: input.deps || [],
    reducers: input.reducers || [],
    isLoadingFuncs: input.isLoadingFuncs || [],
    contextInit: [].concat(input.contextInit || []),
    eventRefiners: input.eventRefiners || {},
    eventDefMemberAdders: input.eventDefMemberAdders || [],
    eventSourceRefiners: input.eventSourceRefiners || {},
    isDraggableTransformers: input.isDraggableTransformers || [],
    eventDragMutationMassagers: input.eventDragMutationMassagers || [],
    eventDefMutationAppliers: input.eventDefMutationAppliers || [],
    dateSelectionTransformers: input.dateSelectionTransformers || [],
    datePointTransforms: input.datePointTransforms || [],
    dateSpanTransforms: input.dateSpanTransforms || [],
    views: input.views || {},
    viewPropsTransformers: input.viewPropsTransformers || [],
    isPropsValid: input.isPropsValid || null,
    externalDefTransforms: input.externalDefTransforms || [],
    viewContainerAppends: input.viewContainerAppends || [],
    eventDropTransformers: input.eventDropTransformers || [],
    componentInteractions: input.componentInteractions || [],
    calendarInteractions: input.calendarInteractions || [],
    themeClasses: input.themeClasses || {},
    eventSourceDefs: input.eventSourceDefs || [],
    cmdFormatter: input.cmdFormatter,
    recurringTypes: input.recurringTypes || [],
    namedTimeZonedImpl: input.namedTimeZonedImpl,
    initialView: input.initialView || '',
    elementDraggingImpl: input.elementDraggingImpl,
    optionChangeHandlers: input.optionChangeHandlers || {},
    scrollGridImpl: input.scrollGridImpl || null,
    listenerRefiners: input.listenerRefiners || {},
    optionRefiners: input.optionRefiners || {},
    propSetHandlers: input.propSetHandlers || {}
  };
}
function buildPluginHooks(pluginDefs, globalDefs) {
  let currentPluginIds = {};
  let hooks = {
    premiumReleaseDate: undefined,
    reducers: [],
    isLoadingFuncs: [],
    contextInit: [],
    eventRefiners: {},
    eventDefMemberAdders: [],
    eventSourceRefiners: {},
    isDraggableTransformers: [],
    eventDragMutationMassagers: [],
    eventDefMutationAppliers: [],
    dateSelectionTransformers: [],
    datePointTransforms: [],
    dateSpanTransforms: [],
    views: {},
    viewPropsTransformers: [],
    isPropsValid: null,
    externalDefTransforms: [],
    viewContainerAppends: [],
    eventDropTransformers: [],
    componentInteractions: [],
    calendarInteractions: [],
    themeClasses: {},
    eventSourceDefs: [],
    cmdFormatter: null,
    recurringTypes: [],
    namedTimeZonedImpl: null,
    initialView: '',
    elementDraggingImpl: null,
    optionChangeHandlers: {},
    scrollGridImpl: null,
    listenerRefiners: {},
    optionRefiners: {},
    propSetHandlers: {}
  };
  function addDefs(defs) {
    for (let def of defs) {
      const pluginName = def.name;
      const currentId = currentPluginIds[pluginName];
      if (currentId === undefined) {
        currentPluginIds[pluginName] = def.id;
        addDefs(def.deps);
        hooks = combineHooks(hooks, def);
      } else if (currentId !== def.id) {
        // different ID than the one already added
        console.warn(`Duplicate plugin '${pluginName}'`);
      }
    }
  }
  if (pluginDefs) {
    addDefs(pluginDefs);
  }
  addDefs(globalDefs);
  return hooks;
}
function buildBuildPluginHooks() {
  let currentOverrideDefs = [];
  let currentGlobalDefs = [];
  let currentHooks;
  return (overrideDefs, globalDefs) => {
    if (!currentHooks || !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(overrideDefs, currentOverrideDefs) || !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(globalDefs, currentGlobalDefs)) {
      currentHooks = buildPluginHooks(overrideDefs, globalDefs);
    }
    currentOverrideDefs = overrideDefs;
    currentGlobalDefs = globalDefs;
    return currentHooks;
  };
}
function combineHooks(hooks0, hooks1) {
  return {
    premiumReleaseDate: compareOptionalDates(hooks0.premiumReleaseDate, hooks1.premiumReleaseDate),
    reducers: hooks0.reducers.concat(hooks1.reducers),
    isLoadingFuncs: hooks0.isLoadingFuncs.concat(hooks1.isLoadingFuncs),
    contextInit: hooks0.contextInit.concat(hooks1.contextInit),
    eventRefiners: Object.assign(Object.assign({}, hooks0.eventRefiners), hooks1.eventRefiners),
    eventDefMemberAdders: hooks0.eventDefMemberAdders.concat(hooks1.eventDefMemberAdders),
    eventSourceRefiners: Object.assign(Object.assign({}, hooks0.eventSourceRefiners), hooks1.eventSourceRefiners),
    isDraggableTransformers: hooks0.isDraggableTransformers.concat(hooks1.isDraggableTransformers),
    eventDragMutationMassagers: hooks0.eventDragMutationMassagers.concat(hooks1.eventDragMutationMassagers),
    eventDefMutationAppliers: hooks0.eventDefMutationAppliers.concat(hooks1.eventDefMutationAppliers),
    dateSelectionTransformers: hooks0.dateSelectionTransformers.concat(hooks1.dateSelectionTransformers),
    datePointTransforms: hooks0.datePointTransforms.concat(hooks1.datePointTransforms),
    dateSpanTransforms: hooks0.dateSpanTransforms.concat(hooks1.dateSpanTransforms),
    views: Object.assign(Object.assign({}, hooks0.views), hooks1.views),
    viewPropsTransformers: hooks0.viewPropsTransformers.concat(hooks1.viewPropsTransformers),
    isPropsValid: hooks1.isPropsValid || hooks0.isPropsValid,
    externalDefTransforms: hooks0.externalDefTransforms.concat(hooks1.externalDefTransforms),
    viewContainerAppends: hooks0.viewContainerAppends.concat(hooks1.viewContainerAppends),
    eventDropTransformers: hooks0.eventDropTransformers.concat(hooks1.eventDropTransformers),
    calendarInteractions: hooks0.calendarInteractions.concat(hooks1.calendarInteractions),
    componentInteractions: hooks0.componentInteractions.concat(hooks1.componentInteractions),
    themeClasses: Object.assign(Object.assign({}, hooks0.themeClasses), hooks1.themeClasses),
    eventSourceDefs: hooks0.eventSourceDefs.concat(hooks1.eventSourceDefs),
    cmdFormatter: hooks1.cmdFormatter || hooks0.cmdFormatter,
    recurringTypes: hooks0.recurringTypes.concat(hooks1.recurringTypes),
    namedTimeZonedImpl: hooks1.namedTimeZonedImpl || hooks0.namedTimeZonedImpl,
    initialView: hooks0.initialView || hooks1.initialView,
    elementDraggingImpl: hooks0.elementDraggingImpl || hooks1.elementDraggingImpl,
    optionChangeHandlers: Object.assign(Object.assign({}, hooks0.optionChangeHandlers), hooks1.optionChangeHandlers),
    scrollGridImpl: hooks1.scrollGridImpl || hooks0.scrollGridImpl,
    listenerRefiners: Object.assign(Object.assign({}, hooks0.listenerRefiners), hooks1.listenerRefiners),
    optionRefiners: Object.assign(Object.assign({}, hooks0.optionRefiners), hooks1.optionRefiners),
    propSetHandlers: Object.assign(Object.assign({}, hooks0.propSetHandlers), hooks1.propSetHandlers)
  };
}
function compareOptionalDates(date0, date1) {
  if (date0 === undefined) {
    return date1;
  }
  if (date1 === undefined) {
    return date0;
  }
  return new Date(Math.max(date0.valueOf(), date1.valueOf()));
}
class StandardTheme extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.T {}
StandardTheme.prototype.classes = {
  root: 'fc-theme-standard',
  tableCellShaded: 'fc-cell-shaded',
  buttonGroup: 'fc-button-group',
  button: 'fc-button fc-button-primary',
  buttonActive: 'fc-button-active'
};
StandardTheme.prototype.baseIconClass = 'fc-icon';
StandardTheme.prototype.iconClasses = {
  close: 'fc-icon-x',
  prev: 'fc-icon-chevron-left',
  next: 'fc-icon-chevron-right',
  prevYear: 'fc-icon-chevrons-left',
  nextYear: 'fc-icon-chevrons-right'
};
StandardTheme.prototype.rtlIconClasses = {
  prev: 'fc-icon-chevron-right',
  next: 'fc-icon-chevron-left',
  prevYear: 'fc-icon-chevrons-right',
  nextYear: 'fc-icon-chevrons-left'
};
StandardTheme.prototype.iconOverrideOption = 'buttonIcons'; // TODO: make TS-friendly
StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon';
StandardTheme.prototype.iconOverridePrefix = 'fc-icon-';
function compileViewDefs(defaultConfigs, overrideConfigs) {
  let hash = {};
  let viewType;
  for (viewType in defaultConfigs) {
    ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  }
  for (viewType in overrideConfigs) {
    ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  }
  return hash;
}
function ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
  if (hash[viewType]) {
    return hash[viewType];
  }
  let viewDef = buildViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  if (viewDef) {
    hash[viewType] = viewDef;
  }
  return viewDef;
}
function buildViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
  let defaultConfig = defaultConfigs[viewType];
  let overrideConfig = overrideConfigs[viewType];
  let queryProp = name => defaultConfig && defaultConfig[name] !== null ? defaultConfig[name] : overrideConfig && overrideConfig[name] !== null ? overrideConfig[name] : null;
  let theComponent = queryProp('component');
  let superType = queryProp('superType');
  let superDef = null;
  if (superType) {
    if (superType === viewType) {
      throw new Error('Can\'t have a custom view type that references itself');
    }
    superDef = ensureViewDef(superType, hash, defaultConfigs, overrideConfigs);
  }
  if (!theComponent && superDef) {
    theComponent = superDef.component;
  }
  if (!theComponent) {
    return null; // don't throw a warning, might be settings for a single-unit view
  }
  return {
    type: viewType,
    component: theComponent,
    defaults: Object.assign(Object.assign({}, superDef ? superDef.defaults : {}), defaultConfig ? defaultConfig.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, superDef ? superDef.overrides : {}), overrideConfig ? overrideConfig.rawOptions : {})
  };
}
function parseViewConfigs(inputs) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(inputs, parseViewConfig);
}
function parseViewConfig(input) {
  let rawOptions = typeof input === 'function' ? {
    component: input
  } : input;
  let {
    component
  } = rawOptions;
  if (rawOptions.content) {
    // TODO: remove content/classNames/didMount/etc from options?
    component = createViewHookComponent(rawOptions);
  } else if (component && !(component.prototype instanceof _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B)) {
    // WHY?: people were using `component` property for `content`
    // TODO: converge on one setting name
    component = createViewHookComponent(Object.assign(Object.assign({}, rawOptions), {
      content: component
    }));
  }
  return {
    superType: rawOptions.type,
    component: component,
    rawOptions // includes type and component too :(
  };
}
function createViewHookComponent(options) {
  return viewProps => (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.V.Consumer, null, context => (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.C, {
    elTag: "div",
    elClasses: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.b)(context.viewSpec),
    renderProps: Object.assign(Object.assign({}, viewProps), {
      nextDayThreshold: context.options.nextDayThreshold
    }),
    generatorName: undefined,
    customGenerator: options.content,
    classNameGenerator: options.classNames,
    didMount: options.didMount,
    willUnmount: options.willUnmount
  }));
}
function buildViewSpecs(defaultInputs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
  let defaultConfigs = parseViewConfigs(defaultInputs);
  let overrideConfigs = parseViewConfigs(optionOverrides.views);
  let viewDefs = compileViewDefs(defaultConfigs, overrideConfigs);
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(viewDefs, viewDef => buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults));
}
function buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
  let durationInput = viewDef.overrides.duration || viewDef.defaults.duration || dynamicOptionOverrides.duration || optionOverrides.duration;
  let duration = null;
  let durationUnit = '';
  let singleUnit = '';
  let singleUnitOverrides = {};
  if (durationInput) {
    duration = createDurationCached(durationInput);
    if (duration) {
      // valid?
      let denom = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.c)(duration);
      durationUnit = denom.unit;
      if (denom.value === 1) {
        singleUnit = durationUnit;
        singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].rawOptions : {};
      }
    }
  }
  let queryButtonText = optionsSubset => {
    let buttonTextMap = optionsSubset.buttonText || {};
    let buttonTextKey = viewDef.defaults.buttonTextKey;
    if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
      return buttonTextMap[buttonTextKey];
    }
    if (buttonTextMap[viewDef.type] != null) {
      return buttonTextMap[viewDef.type];
    }
    if (buttonTextMap[singleUnit] != null) {
      return buttonTextMap[singleUnit];
    }
    return null;
  };
  let queryButtonTitle = optionsSubset => {
    let buttonHints = optionsSubset.buttonHints || {};
    let buttonKey = viewDef.defaults.buttonTextKey; // use same key as text
    if (buttonKey != null && buttonHints[buttonKey] != null) {
      return buttonHints[buttonKey];
    }
    if (buttonHints[viewDef.type] != null) {
      return buttonHints[viewDef.type];
    }
    if (buttonHints[singleUnit] != null) {
      return buttonHints[singleUnit];
    }
    return null;
  };
  return {
    type: viewDef.type,
    component: viewDef.component,
    duration,
    durationUnit,
    singleUnit,
    optionDefaults: viewDef.defaults,
    optionOverrides: Object.assign(Object.assign({}, singleUnitOverrides), viewDef.overrides),
    buttonTextOverride: queryButtonText(dynamicOptionOverrides) || queryButtonText(optionOverrides) ||
    // constructor-specified buttonText lookup hash takes precedence
    viewDef.overrides.buttonText,
    buttonTextDefault: queryButtonText(localeDefaults) || viewDef.defaults.buttonText || queryButtonText(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e) || viewDef.type,
    // not DRY
    buttonTitleOverride: queryButtonTitle(dynamicOptionOverrides) || queryButtonTitle(optionOverrides) || viewDef.overrides.buttonHint,
    buttonTitleDefault: queryButtonTitle(localeDefaults) || viewDef.defaults.buttonHint || queryButtonTitle(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e)
    // will eventually fall back to buttonText
  };
}
// hack to get memoization working
let durationInputMap = {};
function createDurationCached(durationInput) {
  let json = JSON.stringify(durationInput);
  let res = durationInputMap[json];
  if (res === undefined) {
    res = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d)(durationInput);
    durationInputMap[json] = res;
  }
  return res;
}
function reduceViewType(viewType, action) {
  switch (action.type) {
    case 'CHANGE_VIEW_TYPE':
      viewType = action.viewType;
  }
  return viewType;
}
function reduceDynamicOptionOverrides(dynamicOptionOverrides, action) {
  switch (action.type) {
    case 'SET_OPTION':
      return Object.assign(Object.assign({}, dynamicOptionOverrides), {
        [action.optionName]: action.rawOptionValue
      });
    default:
      return dynamicOptionOverrides;
  }
}
function reduceDateProfile(currentDateProfile, action, currentDate, dateProfileGenerator) {
  let dp;
  switch (action.type) {
    case 'CHANGE_VIEW_TYPE':
      return dateProfileGenerator.build(action.dateMarker || currentDate);
    case 'CHANGE_DATE':
      return dateProfileGenerator.build(action.dateMarker);
    case 'PREV':
      dp = dateProfileGenerator.buildPrev(currentDateProfile, currentDate);
      if (dp.isValid) {
        return dp;
      }
      break;
    case 'NEXT':
      dp = dateProfileGenerator.buildNext(currentDateProfile, currentDate);
      if (dp.isValid) {
        return dp;
      }
      break;
  }
  return currentDateProfile;
}
function initEventSources(calendarOptions, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null;
  return addSources({}, parseInitialSources(calendarOptions, context), activeRange, context);
}
function reduceEventSources(eventSources, action, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null; // need this check?
  switch (action.type) {
    case 'ADD_EVENT_SOURCES':
      // already parsed
      return addSources(eventSources, action.sources, activeRange, context);
    case 'REMOVE_EVENT_SOURCE':
      return removeSource(eventSources, action.sourceId);
    case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
    case 'NEXT':
    case 'CHANGE_DATE':
    case 'CHANGE_VIEW_TYPE':
      if (dateProfile) {
        return fetchDirtySources(eventSources, activeRange, context);
      }
      return eventSources;
    case 'FETCH_EVENT_SOURCES':
      return fetchSourcesByIds(eventSources, action.sourceIds ?
      // why no type?
      (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.f)(action.sourceIds) : excludeStaticSources(eventSources, context), activeRange, action.isRefetch || false, context);
    case 'RECEIVE_EVENTS':
    case 'RECEIVE_EVENT_ERROR':
      return receiveResponse(eventSources, action.sourceId, action.fetchId, action.fetchRange);
    case 'REMOVE_ALL_EVENT_SOURCES':
      return {};
    default:
      return eventSources;
  }
}
function reduceEventSourcesNewTimeZone(eventSources, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null; // need this check?
  return fetchSourcesByIds(eventSources, excludeStaticSources(eventSources, context), activeRange, true, context);
}
function computeEventSourcesLoading(eventSources) {
  for (let sourceId in eventSources) {
    if (eventSources[sourceId].isFetching) {
      return true;
    }
  }
  return false;
}
function addSources(eventSourceHash, sources, fetchRange, context) {
  let hash = {};
  for (let source of sources) {
    hash[source.sourceId] = source;
  }
  if (fetchRange) {
    hash = fetchDirtySources(hash, fetchRange, context);
  }
  return Object.assign(Object.assign({}, eventSourceHash), hash);
}
function removeSource(eventSourceHash, sourceId) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(eventSourceHash, eventSource => eventSource.sourceId !== sourceId);
}
function fetchDirtySources(sourceHash, fetchRange, context) {
  return fetchSourcesByIds(sourceHash, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(sourceHash, eventSource => isSourceDirty(eventSource, fetchRange, context)), fetchRange, false, context);
}
function isSourceDirty(eventSource, fetchRange, context) {
  if (!doesSourceNeedRange(eventSource, context)) {
    return !eventSource.latestFetchId;
  }
  return !context.options.lazyFetching || !eventSource.fetchRange || eventSource.isFetching ||
  // always cancel outdated in-progress fetches
  fetchRange.start < eventSource.fetchRange.start || fetchRange.end > eventSource.fetchRange.end;
}
function fetchSourcesByIds(prevSources, sourceIdHash, fetchRange, isRefetch, context) {
  let nextSources = {};
  for (let sourceId in prevSources) {
    let source = prevSources[sourceId];
    if (sourceIdHash[sourceId]) {
      nextSources[sourceId] = fetchSource(source, fetchRange, isRefetch, context);
    } else {
      nextSources[sourceId] = source;
    }
  }
  return nextSources;
}
function fetchSource(eventSource, fetchRange, isRefetch, context) {
  let {
    options,
    calendarApi
  } = context;
  let sourceDef = context.pluginHooks.eventSourceDefs[eventSource.sourceDefId];
  let fetchId = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.g)();
  sourceDef.fetch({
    eventSource,
    range: fetchRange,
    isRefetch,
    context
  }, res => {
    let {
      rawEvents
    } = res;
    if (options.eventSourceSuccess) {
      rawEvents = options.eventSourceSuccess.call(calendarApi, rawEvents, res.response) || rawEvents;
    }
    if (eventSource.success) {
      rawEvents = eventSource.success.call(calendarApi, rawEvents, res.response) || rawEvents;
    }
    context.dispatch({
      type: 'RECEIVE_EVENTS',
      sourceId: eventSource.sourceId,
      fetchId,
      fetchRange,
      rawEvents
    });
  }, error => {
    let errorHandled = false;
    if (options.eventSourceFailure) {
      options.eventSourceFailure.call(calendarApi, error);
      errorHandled = true;
    }
    if (eventSource.failure) {
      eventSource.failure(error);
      errorHandled = true;
    }
    if (!errorHandled) {
      console.warn(error.message, error);
    }
    context.dispatch({
      type: 'RECEIVE_EVENT_ERROR',
      sourceId: eventSource.sourceId,
      fetchId,
      fetchRange,
      error
    });
  });
  return Object.assign(Object.assign({}, eventSource), {
    isFetching: true,
    latestFetchId: fetchId
  });
}
function receiveResponse(sourceHash, sourceId, fetchId, fetchRange) {
  let eventSource = sourceHash[sourceId];
  if (eventSource &&
  // not already removed
  fetchId === eventSource.latestFetchId) {
    return Object.assign(Object.assign({}, sourceHash), {
      [sourceId]: Object.assign(Object.assign({}, eventSource), {
        isFetching: false,
        fetchRange
      })
    });
  }
  return sourceHash;
}
function excludeStaticSources(eventSources, context) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(eventSources, eventSource => doesSourceNeedRange(eventSource, context));
}
function parseInitialSources(rawOptions, context) {
  let refiners = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.j)(context);
  let rawSources = [].concat(rawOptions.eventSources || []);
  let sources = []; // parsed
  if (rawOptions.initialEvents) {
    rawSources.unshift(rawOptions.initialEvents);
  }
  if (rawOptions.events) {
    rawSources.unshift(rawOptions.events);
  }
  for (let rawSource of rawSources) {
    let source = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.p)(rawSource, context, refiners);
    if (source) {
      sources.push(source);
    }
  }
  return sources;
}
function doesSourceNeedRange(eventSource, context) {
  let defs = context.pluginHooks.eventSourceDefs;
  return !defs[eventSource.sourceDefId].ignoreRange;
}
function reduceDateSelection(currentSelection, action) {
  switch (action.type) {
    case 'UNSELECT_DATES':
      return null;
    case 'SELECT_DATES':
      return action.selection;
    default:
      return currentSelection;
  }
}
function reduceSelectedEvent(currentInstanceId, action) {
  switch (action.type) {
    case 'UNSELECT_EVENT':
      return '';
    case 'SELECT_EVENT':
      return action.eventInstanceId;
    default:
      return currentInstanceId;
  }
}
function reduceEventDrag(currentDrag, action) {
  let newDrag;
  switch (action.type) {
    case 'UNSET_EVENT_DRAG':
      return null;
    case 'SET_EVENT_DRAG':
      newDrag = action.state;
      return {
        affectedEvents: newDrag.affectedEvents,
        mutatedEvents: newDrag.mutatedEvents,
        isEvent: newDrag.isEvent
      };
    default:
      return currentDrag;
  }
}
function reduceEventResize(currentResize, action) {
  let newResize;
  switch (action.type) {
    case 'UNSET_EVENT_RESIZE':
      return null;
    case 'SET_EVENT_RESIZE':
      newResize = action.state;
      return {
        affectedEvents: newResize.affectedEvents,
        mutatedEvents: newResize.mutatedEvents,
        isEvent: newResize.isEvent
      };
    default:
      return currentResize;
  }
}
function parseToolbars(calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) {
  let header = calendarOptions.headerToolbar ? parseToolbar(calendarOptions.headerToolbar, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) : null;
  let footer = calendarOptions.footerToolbar ? parseToolbar(calendarOptions.footerToolbar, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) : null;
  return {
    header,
    footer
  };
}
function parseToolbar(sectionStrHash, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) {
  let sectionWidgets = {};
  let viewsWithButtons = [];
  let hasTitle = false;
  for (let sectionName in sectionStrHash) {
    let sectionStr = sectionStrHash[sectionName];
    let sectionRes = parseSection(sectionStr, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi);
    sectionWidgets[sectionName] = sectionRes.widgets;
    viewsWithButtons.push(...sectionRes.viewsWithButtons);
    hasTitle = hasTitle || sectionRes.hasTitle;
  }
  return {
    sectionWidgets,
    viewsWithButtons,
    hasTitle
  };
}
/*
BAD: querying icons and text here. should be done at render time
*/
function parseSection(sectionStr, calendarOptions,
// defaults+overrides, then refined
calendarOptionOverrides,
// overrides only!, unrefined :(
theme, viewSpecs, calendarApi) {
  let isRtl = calendarOptions.direction === 'rtl';
  let calendarCustomButtons = calendarOptions.customButtons || {};
  let calendarButtonTextOverrides = calendarOptionOverrides.buttonText || {};
  let calendarButtonText = calendarOptions.buttonText || {};
  let calendarButtonHintOverrides = calendarOptionOverrides.buttonHints || {};
  let calendarButtonHints = calendarOptions.buttonHints || {};
  let sectionSubstrs = sectionStr ? sectionStr.split(' ') : [];
  let viewsWithButtons = [];
  let hasTitle = false;
  let widgets = sectionSubstrs.map(buttonGroupStr => buttonGroupStr.split(',').map(buttonName => {
    if (buttonName === 'title') {
      hasTitle = true;
      return {
        buttonName
      };
    }
    let customButtonProps;
    let viewSpec;
    let buttonClick;
    let buttonIcon; // only one of these will be set
    let buttonText; // "
    let buttonHint;
    // ^ for the title="" attribute, for accessibility
    if (customButtonProps = calendarCustomButtons[buttonName]) {
      buttonClick = ev => {
        if (customButtonProps.click) {
          customButtonProps.click.call(ev.target, ev, ev.target); // TODO: use Calendar this context?
        }
      };
      (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = customButtonProps.text);
      buttonHint = customButtonProps.hint || customButtonProps.text;
    } else if (viewSpec = viewSpecs[buttonName]) {
      viewsWithButtons.push(buttonName);
      buttonClick = () => {
        calendarApi.changeView(buttonName);
      };
      (buttonText = viewSpec.buttonTextOverride) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = viewSpec.buttonTextDefault);
      let textFallback = viewSpec.buttonTextOverride || viewSpec.buttonTextDefault;
      buttonHint = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(viewSpec.buttonTitleOverride || viewSpec.buttonTitleDefault || calendarOptions.viewHint, [textFallback, buttonName],
      // view-name = buttonName
      textFallback);
    } else if (calendarApi[buttonName]) {
      // a calendarApi method
      buttonClick = () => {
        calendarApi[buttonName]();
      };
      (buttonText = calendarButtonTextOverrides[buttonName]) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = calendarButtonText[buttonName]); // everything else is considered default
      if (buttonName === 'prevYear' || buttonName === 'nextYear') {
        let prevOrNext = buttonName === 'prevYear' ? 'prev' : 'next';
        buttonHint = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(calendarButtonHintOverrides[prevOrNext] || calendarButtonHints[prevOrNext], [calendarButtonText.year || 'year', 'year'], calendarButtonText[buttonName]);
      } else {
        buttonHint = navUnit => (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(calendarButtonHintOverrides[buttonName] || calendarButtonHints[buttonName], [calendarButtonText[navUnit] || navUnit, navUnit], calendarButtonText[buttonName]);
      }
    }
    return {
      buttonName,
      buttonClick,
      buttonIcon,
      buttonText,
      buttonHint
    };
  }));
  return {
    widgets,
    viewsWithButtons,
    hasTitle
  };
}

// always represents the current view. otherwise, it'd need to change value every time date changes
class ViewImpl {
  constructor(type, getCurrentData, dateEnv) {
    this.type = type;
    this.getCurrentData = getCurrentData;
    this.dateEnv = dateEnv;
  }
  get calendar() {
    return this.getCurrentData().calendarApi;
  }
  get title() {
    return this.getCurrentData().viewTitle;
  }
  get activeStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start);
  }
  get activeEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end);
  }
  get currentStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start);
  }
  get currentEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end);
  }
  getOption(name) {
    return this.getCurrentData().options[name]; // are the view-specific options
  }
}
let eventSourceDef$2 = {
  ignoreRange: true,
  parseMeta(refined) {
    if (Array.isArray(refined.events)) {
      return refined.events;
    }
    return null;
  },
  fetch(arg, successCallback) {
    successCallback({
      rawEvents: arg.eventSource.meta
    });
  }
};
const arrayEventSourcePlugin = createPlugin({
  name: 'array-event-source',
  eventSourceDefs: [eventSourceDef$2]
});
let eventSourceDef$1 = {
  parseMeta(refined) {
    if (typeof refined.events === 'function') {
      return refined.events;
    }
    return null;
  },
  fetch(arg, successCallback, errorCallback) {
    const {
      dateEnv
    } = arg.context;
    const func = arg.eventSource.meta;
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.u)(func.bind(null, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.l)(arg.range, dateEnv)), rawEvents => successCallback({
      rawEvents
    }), errorCallback);
  }
};
const funcEventSourcePlugin = createPlugin({
  name: 'func-event-source',
  eventSourceDefs: [eventSourceDef$1]
});
const JSON_FEED_EVENT_SOURCE_REFINERS = {
  method: String,
  extraParams: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let eventSourceDef = {
  parseMeta(refined) {
    if (refined.url && (refined.format === 'json' || !refined.format)) {
      return {
        url: refined.url,
        format: 'json',
        method: (refined.method || 'GET').toUpperCase(),
        extraParams: refined.extraParams,
        startParam: refined.startParam,
        endParam: refined.endParam,
        timeZoneParam: refined.timeZoneParam
      };
    }
    return null;
  },
  fetch(arg, successCallback, errorCallback) {
    const {
      meta
    } = arg.eventSource;
    const requestParams = buildRequestParams(meta, arg.range, arg.context);
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.r)(meta.method, meta.url, requestParams).then(([rawEvents, response]) => {
      successCallback({
        rawEvents,
        response
      });
    }, errorCallback);
  }
};
const jsonFeedEventSourcePlugin = createPlugin({
  name: 'json-event-source',
  eventSourceRefiners: JSON_FEED_EVENT_SOURCE_REFINERS,
  eventSourceDefs: [eventSourceDef]
});
function buildRequestParams(meta, range, context) {
  let {
    dateEnv,
    options
  } = context;
  let startParam;
  let endParam;
  let timeZoneParam;
  let customRequestParams;
  let params = {};
  startParam = meta.startParam;
  if (startParam == null) {
    startParam = options.startParam;
  }
  endParam = meta.endParam;
  if (endParam == null) {
    endParam = options.endParam;
  }
  timeZoneParam = meta.timeZoneParam;
  if (timeZoneParam == null) {
    timeZoneParam = options.timeZoneParam;
  }
  // retrieve any outbound GET/POST data from the options
  if (typeof meta.extraParams === 'function') {
    // supplied as a function that returns a key/value object
    customRequestParams = meta.extraParams();
  } else {
    // probably supplied as a straight key/value object
    customRequestParams = meta.extraParams || {};
  }
  Object.assign(params, customRequestParams);
  params[startParam] = dateEnv.formatIso(range.start);
  params[endParam] = dateEnv.formatIso(range.end);
  if (dateEnv.timeZone !== 'local') {
    params[timeZoneParam] = dateEnv.timeZone;
  }
  return params;
}
const SIMPLE_RECURRING_REFINERS = {
  daysOfWeek: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  startTime: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  endTime: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  duration: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  startRecur: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  endRecur: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n
};
let recurring = {
  parse(refined, dateEnv) {
    if (refined.daysOfWeek || refined.startTime || refined.endTime || refined.startRecur || refined.endRecur) {
      let recurringData = {
        daysOfWeek: refined.daysOfWeek || null,
        startTime: refined.startTime || null,
        endTime: refined.endTime || null,
        startRecur: refined.startRecur ? dateEnv.createMarker(refined.startRecur) : null,
        endRecur: refined.endRecur ? dateEnv.createMarker(refined.endRecur) : null
      };
      let duration;
      if (refined.duration) {
        duration = refined.duration;
      }
      if (!duration && refined.startTime && refined.endTime) {
        duration = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.s)(refined.endTime, refined.startTime);
      }
      return {
        allDayGuess: Boolean(!refined.startTime && !refined.endTime),
        duration,
        typeData: recurringData // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(typeData, framingRange, dateEnv) {
    let clippedFramingRange = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.o)(framingRange, {
      start: typeData.startRecur,
      end: typeData.endRecur
    });
    if (clippedFramingRange) {
      return expandRanges(typeData.daysOfWeek, typeData.startTime, clippedFramingRange, dateEnv);
    }
    return [];
  }
};
const simpleRecurringEventsPlugin = createPlugin({
  name: 'simple-recurring-event',
  recurringTypes: [recurring],
  eventRefiners: SIMPLE_RECURRING_REFINERS
});
function expandRanges(daysOfWeek, startTime, framingRange, dateEnv) {
  let dowHash = daysOfWeek ? (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.f)(daysOfWeek) : null;
  let dayMarker = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.q)(framingRange.start);
  let endMarker = framingRange.end;
  let instanceStarts = [];
  while (dayMarker < endMarker) {
    let instanceStart;
    // if everyday, or this particular day-of-week
    if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
      if (startTime) {
        instanceStart = dateEnv.add(dayMarker, startTime);
      } else {
        instanceStart = dayMarker;
      }
      instanceStarts.push(instanceStart);
    }
    dayMarker = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.t)(dayMarker, 1);
  }
  return instanceStarts;
}
const changeHandlerPlugin = createPlugin({
  name: 'change-handler',
  optionChangeHandlers: {
    events(events, context) {
      handleEventSources([events], context);
    },
    eventSources: handleEventSources
  }
});
/*
BUG: if `event` was supplied, all previously-given `eventSources` will be wiped out
*/
function handleEventSources(inputs, context) {
  let unfoundSources = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.v)(context.getCurrentData().eventSources);
  if (unfoundSources.length === 1 && inputs.length === 1 && Array.isArray(unfoundSources[0]._raw) && Array.isArray(inputs[0])) {
    context.dispatch({
      type: 'RESET_RAW_EVENTS',
      sourceId: unfoundSources[0].sourceId,
      rawEvents: inputs[0]
    });
    return;
  }
  let newInputs = [];
  for (let input of inputs) {
    let inputFound = false;
    for (let i = 0; i < unfoundSources.length; i += 1) {
      if (unfoundSources[i]._raw === input) {
        unfoundSources.splice(i, 1); // delete
        inputFound = true;
        break;
      }
    }
    if (!inputFound) {
      newInputs.push(input);
    }
  }
  for (let unfoundSource of unfoundSources) {
    context.dispatch({
      type: 'REMOVE_EVENT_SOURCE',
      sourceId: unfoundSource.sourceId
    });
  }
  for (let newInput of newInputs) {
    context.calendarApi.addEventSource(newInput);
  }
}
function handleDateProfile(dateProfile, context) {
  context.emitter.trigger('datesSet', Object.assign(Object.assign({}, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.l)(dateProfile.activeRange, context.dateEnv)), {
    view: context.viewApi
  }));
}
function handleEventStore(eventStore, context) {
  let {
    emitter
  } = context;
  if (emitter.hasHandlers('eventsSet')) {
    emitter.trigger('eventsSet', (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.w)(eventStore, context));
  }
}

/*
this array is exposed on the root namespace so that UMD plugins can add to it.
see the rollup-bundles script.
*/
const globalPlugins = [arrayEventSourcePlugin, funcEventSourcePlugin, jsonFeedEventSourcePlugin, simpleRecurringEventsPlugin, changeHandlerPlugin, createPlugin({
  name: 'misc',
  isLoadingFuncs: [state => computeEventSourcesLoading(state.eventSources)],
  propSetHandlers: {
    dateProfile: handleDateProfile,
    eventStore: handleEventStore
  }
})];
class TaskRunner {
  constructor(runTaskOption, drainedOption) {
    this.runTaskOption = runTaskOption;
    this.drainedOption = drainedOption;
    this.queue = [];
    this.delayedRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(this.drain.bind(this));
  }
  request(task, delay) {
    this.queue.push(task);
    this.delayedRunner.request(delay);
  }
  pause(scope) {
    this.delayedRunner.pause(scope);
  }
  resume(scope, force) {
    this.delayedRunner.resume(scope, force);
  }
  drain() {
    let {
      queue
    } = this;
    while (queue.length) {
      let completedTasks = [];
      let task;
      while (task = queue.shift()) {
        this.runTask(task);
        completedTasks.push(task);
      }
      this.drained(completedTasks);
    } // keep going, in case new tasks were added in the drained handler
  }
  runTask(task) {
    if (this.runTaskOption) {
      this.runTaskOption(task);
    }
  }
  drained(completedTasks) {
    if (this.drainedOption) {
      this.drainedOption(completedTasks);
    }
  }
}

// Computes what the title at the top of the calendarApi should be for this view
function buildTitle(dateProfile, viewOptions, dateEnv) {
  let range;
  // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
  if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
    range = dateProfile.currentRange;
  } else {
    // for day units or smaller, use the actual day range
    range = dateProfile.activeRange;
  }
  return dateEnv.formatRange(range.start, range.end, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(viewOptions.titleFormat || buildTitleFormat(dateProfile)), {
    isEndExclusive: dateProfile.isRangeAllDay,
    defaultSeparator: viewOptions.titleRangeSeparator
  });
}
// Generates the format string that should be used to generate the title for the current date range.
// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
function buildTitleFormat(dateProfile) {
  let {
    currentRangeUnit
  } = dateProfile;
  if (currentRangeUnit === 'year') {
    return {
      year: 'numeric'
    };
  }
  if (currentRangeUnit === 'month') {
    return {
      year: 'numeric',
      month: 'long'
    }; // like "September 2014"
  }
  let days = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.y)(dateProfile.currentRange.start, dateProfile.currentRange.end);
  if (days !== null && days > 1) {
    // multi-day range. shorter, like "Sep 9 - 10 2014"
    return {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  }
  // one day. longer, like "September 9 2014"
  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
}

// in future refactor, do the redux-style function(state=initial) for initial-state
// also, whatever is happening in constructor, have it happen in action queue too
class CalendarDataManager {
  constructor(props) {
    this.computeCurrentViewData = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(this._computeCurrentViewData);
    this.organizeRawLocales = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(organizeRawLocales);
    this.buildLocale = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildLocale);
    this.buildPluginHooks = buildBuildPluginHooks();
    this.buildDateEnv = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildDateEnv$1);
    this.buildTheme = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildTheme);
    this.parseToolbars = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(parseToolbars);
    this.buildViewSpecs = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewSpecs);
    this.buildDateProfileGenerator = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(buildDateProfileGenerator);
    this.buildViewApi = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewApi);
    this.buildViewUiProps = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(buildViewUiProps);
    this.buildEventUiBySource = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildEventUiBySource, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.E);
    this.buildEventUiBases = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildEventUiBases);
    this.parseContextBusinessHours = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(parseContextBusinessHours);
    this.buildTitle = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildTitle);
    this.emitter = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.F();
    this.actionRunner = new TaskRunner(this._handleAction.bind(this), this.updateData.bind(this));
    this.currentCalendarOptionsInput = {};
    this.currentCalendarOptionsRefined = {};
    this.currentViewOptionsInput = {};
    this.currentViewOptionsRefined = {};
    this.currentCalendarOptionsRefiners = {};
    this.optionsForRefining = [];
    this.optionsForHandling = [];
    this.getCurrentData = () => this.data;
    this.dispatch = action => {
      this.actionRunner.request(action); // protects against recursive calls to _handleAction
    };
    this.props = props;
    this.actionRunner.pause();
    let dynamicOptionOverrides = {};
    let optionsData = this.computeOptionsData(props.optionOverrides, dynamicOptionOverrides, props.calendarApi);
    let currentViewType = optionsData.calendarOptions.initialView || optionsData.pluginHooks.initialView;
    let currentViewData = this.computeCurrentViewData(currentViewType, optionsData, props.optionOverrides, dynamicOptionOverrides);
    // wire things up
    // TODO: not DRY
    props.calendarApi.currentDataManager = this;
    this.emitter.setThisContext(props.calendarApi);
    this.emitter.setOptions(currentViewData.options);
    let currentDate = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.G)(optionsData.calendarOptions, optionsData.dateEnv);
    let dateProfile = currentViewData.dateProfileGenerator.build(currentDate);
    if (!(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.activeRange, currentDate)) {
      currentDate = dateProfile.currentRange.start;
    }
    let calendarContext = {
      dateEnv: optionsData.dateEnv,
      options: optionsData.calendarOptions,
      pluginHooks: optionsData.pluginHooks,
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    };
    // needs to be after setThisContext
    for (let callback of optionsData.pluginHooks.contextInit) {
      callback(calendarContext);
    }
    // NOT DRY
    let eventSources = initEventSources(optionsData.calendarOptions, dateProfile, calendarContext);
    let initialState = {
      dynamicOptionOverrides,
      currentViewType,
      currentDate,
      dateProfile,
      businessHours: this.parseContextBusinessHours(calendarContext),
      eventSources,
      eventUiBases: {},
      eventStore: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
      renderableEventStore: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
      dateSelection: null,
      eventSelection: '',
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(calendarContext).selectionConfig
    };
    let contextAndState = Object.assign(Object.assign({}, calendarContext), initialState);
    for (let reducer of optionsData.pluginHooks.reducers) {
      Object.assign(initialState, reducer(null, null, contextAndState));
    }
    if (computeIsLoading(initialState, calendarContext)) {
      this.emitter.trigger('loading', true); // NOT DRY
    }
    this.state = initialState;
    this.updateData();
    this.actionRunner.resume();
  }
  resetOptions(optionOverrides, changedOptionNames) {
    let {
      props
    } = this;
    if (changedOptionNames === undefined) {
      props.optionOverrides = optionOverrides;
    } else {
      props.optionOverrides = Object.assign(Object.assign({}, props.optionOverrides || {}), optionOverrides);
      this.optionsForRefining.push(...changedOptionNames);
    }
    if (changedOptionNames === undefined || changedOptionNames.length) {
      this.actionRunner.request({
        type: 'NOTHING'
      });
    }
  }
  _handleAction(action) {
    let {
      props,
      state,
      emitter
    } = this;
    let dynamicOptionOverrides = reduceDynamicOptionOverrides(state.dynamicOptionOverrides, action);
    let optionsData = this.computeOptionsData(props.optionOverrides, dynamicOptionOverrides, props.calendarApi);
    let currentViewType = reduceViewType(state.currentViewType, action);
    let currentViewData = this.computeCurrentViewData(currentViewType, optionsData, props.optionOverrides, dynamicOptionOverrides);
    // wire things up
    // TODO: not DRY
    props.calendarApi.currentDataManager = this;
    emitter.setThisContext(props.calendarApi);
    emitter.setOptions(currentViewData.options);
    let calendarContext = {
      dateEnv: optionsData.dateEnv,
      options: optionsData.calendarOptions,
      pluginHooks: optionsData.pluginHooks,
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter,
      getCurrentData: this.getCurrentData
    };
    let {
      currentDate,
      dateProfile
    } = state;
    if (this.data && this.data.dateProfileGenerator !== currentViewData.dateProfileGenerator) {
      // hack
      dateProfile = currentViewData.dateProfileGenerator.build(currentDate);
    }
    currentDate = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.J)(currentDate, action);
    dateProfile = reduceDateProfile(dateProfile, action, currentDate, currentViewData.dateProfileGenerator);
    if (action.type === 'PREV' ||
    // TODO: move this logic into DateProfileGenerator
    action.type === 'NEXT' ||
    // "
    !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.currentRange, currentDate)) {
      currentDate = dateProfile.currentRange.start;
    }
    let eventSources = reduceEventSources(state.eventSources, action, dateProfile, calendarContext);
    let eventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.K)(state.eventStore, action, eventSources, dateProfile, calendarContext);
    let isEventsLoading = computeEventSourcesLoading(eventSources); // BAD. also called in this func in computeIsLoading
    let renderableEventStore = isEventsLoading && !currentViewData.options.progressiveEventRendering ? state.renderableEventStore || eventStore :
    // try from previous state
    eventStore;
    let {
      eventUiSingleBase,
      selectionConfig
    } = this.buildViewUiProps(calendarContext); // will memoize obj
    let eventUiBySource = this.buildEventUiBySource(eventSources);
    let eventUiBases = this.buildEventUiBases(renderableEventStore.defs, eventUiSingleBase, eventUiBySource);
    let newState = {
      dynamicOptionOverrides,
      currentViewType,
      currentDate,
      dateProfile,
      eventSources,
      eventStore,
      renderableEventStore,
      selectionConfig,
      eventUiBases,
      businessHours: this.parseContextBusinessHours(calendarContext),
      dateSelection: reduceDateSelection(state.dateSelection, action),
      eventSelection: reduceSelectedEvent(state.eventSelection, action),
      eventDrag: reduceEventDrag(state.eventDrag, action),
      eventResize: reduceEventResize(state.eventResize, action)
    };
    let contextAndState = Object.assign(Object.assign({}, calendarContext), newState);
    for (let reducer of optionsData.pluginHooks.reducers) {
      Object.assign(newState, reducer(state, action, contextAndState)); // give the OLD state, for old value
    }
    let wasLoading = computeIsLoading(state, calendarContext);
    let isLoading = computeIsLoading(newState, calendarContext);
    // TODO: use propSetHandlers in plugin system
    if (!wasLoading && isLoading) {
      emitter.trigger('loading', true);
    } else if (wasLoading && !isLoading) {
      emitter.trigger('loading', false);
    }
    this.state = newState;
    if (props.onAction) {
      props.onAction(action);
    }
  }
  updateData() {
    let {
      props,
      state
    } = this;
    let oldData = this.data;
    let optionsData = this.computeOptionsData(props.optionOverrides, state.dynamicOptionOverrides, props.calendarApi);
    let currentViewData = this.computeCurrentViewData(state.currentViewType, optionsData, props.optionOverrides, state.dynamicOptionOverrides);
    let data = this.data = Object.assign(Object.assign(Object.assign({
      viewTitle: this.buildTitle(state.dateProfile, currentViewData.options, optionsData.dateEnv),
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    }, optionsData), currentViewData), state);
    let changeHandlers = optionsData.pluginHooks.optionChangeHandlers;
    let oldCalendarOptions = oldData && oldData.calendarOptions;
    let newCalendarOptions = optionsData.calendarOptions;
    if (oldCalendarOptions && oldCalendarOptions !== newCalendarOptions) {
      if (oldCalendarOptions.timeZone !== newCalendarOptions.timeZone) {
        // hack
        state.eventSources = data.eventSources = reduceEventSourcesNewTimeZone(data.eventSources, state.dateProfile, data);
        state.eventStore = data.eventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.L)(data.eventStore, oldData.dateEnv, data.dateEnv);
        state.renderableEventStore = data.renderableEventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.L)(data.renderableEventStore, oldData.dateEnv, data.dateEnv);
      }
      for (let optionName in changeHandlers) {
        if (this.optionsForHandling.indexOf(optionName) !== -1 || oldCalendarOptions[optionName] !== newCalendarOptions[optionName]) {
          changeHandlers[optionName](newCalendarOptions[optionName], data);
        }
      }
    }
    this.optionsForHandling = [];
    if (props.onData) {
      props.onData(data);
    }
  }
  computeOptionsData(optionOverrides, dynamicOptionOverrides, calendarApi) {
    // TODO: blacklist options that are handled by optionChangeHandlers
    if (!this.optionsForRefining.length && optionOverrides === this.stableOptionOverrides && dynamicOptionOverrides === this.stableDynamicOptionOverrides) {
      return this.stableCalendarOptionsData;
    }
    let {
      refinedOptions,
      pluginHooks,
      localeDefaults,
      availableLocaleData,
      extra
    } = this.processRawCalendarOptions(optionOverrides, dynamicOptionOverrides);
    warnUnknownOptions(extra);
    let dateEnv = this.buildDateEnv(refinedOptions.timeZone, refinedOptions.locale, refinedOptions.weekNumberCalculation, refinedOptions.firstDay, refinedOptions.weekText, pluginHooks, availableLocaleData, refinedOptions.defaultRangeSeparator);
    let viewSpecs = this.buildViewSpecs(pluginHooks.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, localeDefaults);
    let theme = this.buildTheme(refinedOptions, pluginHooks);
    let toolbarConfig = this.parseToolbars(refinedOptions, this.stableOptionOverrides, theme, viewSpecs, calendarApi);
    return this.stableCalendarOptionsData = {
      calendarOptions: refinedOptions,
      pluginHooks,
      dateEnv,
      viewSpecs,
      theme,
      toolbarConfig,
      localeDefaults,
      availableRawLocales: availableLocaleData.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(optionOverrides, dynamicOptionOverrides) {
    let {
      locales,
      locale
    } = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, optionOverrides, dynamicOptionOverrides]);
    let availableLocaleData = this.organizeRawLocales(locales);
    let availableRawLocales = availableLocaleData.map;
    let localeDefaults = this.buildLocale(locale || availableLocaleData.defaultCode, availableRawLocales).options;
    let pluginHooks = this.buildPluginHooks(optionOverrides.plugins || [], globalPlugins);
    let refiners = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.N), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.O), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.P), pluginHooks.listenerRefiners), pluginHooks.optionRefiners);
    let extra = {};
    let raw = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, localeDefaults, optionOverrides, dynamicOptionOverrides]);
    let refined = {};
    let currentRaw = this.currentCalendarOptionsInput;
    let currentRefined = this.currentCalendarOptionsRefined;
    let anyChanges = false;
    for (let optionName in raw) {
      if (this.optionsForRefining.indexOf(optionName) === -1 && (raw[optionName] === currentRaw[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && optionName in currentRaw && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](currentRaw[optionName], raw[optionName]))) {
        refined[optionName] = currentRefined[optionName];
      } else if (refiners[optionName]) {
        refined[optionName] = refiners[optionName](raw[optionName]);
        anyChanges = true;
      } else {
        extra[optionName] = currentRaw[optionName];
      }
    }
    if (anyChanges) {
      this.currentCalendarOptionsInput = raw;
      this.currentCalendarOptionsRefined = refined;
      this.stableOptionOverrides = optionOverrides;
      this.stableDynamicOptionOverrides = dynamicOptionOverrides;
    }
    this.optionsForHandling.push(...this.optionsForRefining);
    this.optionsForRefining = [];
    return {
      rawOptions: this.currentCalendarOptionsInput,
      refinedOptions: this.currentCalendarOptionsRefined,
      pluginHooks,
      availableLocaleData,
      localeDefaults,
      extra
    };
  }
  _computeCurrentViewData(viewType, optionsData, optionOverrides, dynamicOptionOverrides) {
    let viewSpec = optionsData.viewSpecs[viewType];
    if (!viewSpec) {
      throw new Error(`viewType "${viewType}" is not available. Please make sure you've loaded all neccessary plugins`);
    }
    let {
      refinedOptions,
      extra
    } = this.processRawViewOptions(viewSpec, optionsData.pluginHooks, optionsData.localeDefaults, optionOverrides, dynamicOptionOverrides);
    warnUnknownOptions(extra);
    let dateProfileGenerator = this.buildDateProfileGenerator({
      dateProfileGeneratorClass: viewSpec.optionDefaults.dateProfileGeneratorClass,
      duration: viewSpec.duration,
      durationUnit: viewSpec.durationUnit,
      usesMinMaxTime: viewSpec.optionDefaults.usesMinMaxTime,
      dateEnv: optionsData.dateEnv,
      calendarApi: this.props.calendarApi,
      slotMinTime: refinedOptions.slotMinTime,
      slotMaxTime: refinedOptions.slotMaxTime,
      showNonCurrentDates: refinedOptions.showNonCurrentDates,
      dayCount: refinedOptions.dayCount,
      dateAlignment: refinedOptions.dateAlignment,
      dateIncrement: refinedOptions.dateIncrement,
      hiddenDays: refinedOptions.hiddenDays,
      weekends: refinedOptions.weekends,
      nowInput: refinedOptions.now,
      validRangeInput: refinedOptions.validRange,
      visibleRangeInput: refinedOptions.visibleRange,
      fixedWeekCount: refinedOptions.fixedWeekCount
    });
    let viewApi = this.buildViewApi(viewType, this.getCurrentData, optionsData.dateEnv);
    return {
      viewSpec,
      options: refinedOptions,
      dateProfileGenerator,
      viewApi
    };
  }
  processRawViewOptions(viewSpec, pluginHooks, localeDefaults, optionOverrides, dynamicOptionOverrides) {
    let raw = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, viewSpec.optionDefaults, localeDefaults, optionOverrides, viewSpec.optionOverrides, dynamicOptionOverrides]);
    let refiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.N), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.O), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.P), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.R), pluginHooks.listenerRefiners), pluginHooks.optionRefiners);
    let refined = {};
    let currentRaw = this.currentViewOptionsInput;
    let currentRefined = this.currentViewOptionsRefined;
    let anyChanges = false;
    let extra = {};
    for (let optionName in raw) {
      if (raw[optionName] === currentRaw[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](raw[optionName], currentRaw[optionName])) {
        refined[optionName] = currentRefined[optionName];
      } else {
        if (raw[optionName] === this.currentCalendarOptionsInput[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](raw[optionName], this.currentCalendarOptionsInput[optionName])) {
          if (optionName in this.currentCalendarOptionsRefined) {
            // might be an "extra" prop
            refined[optionName] = this.currentCalendarOptionsRefined[optionName];
          }
        } else if (refiners[optionName]) {
          refined[optionName] = refiners[optionName](raw[optionName]);
        } else {
          extra[optionName] = raw[optionName];
        }
        anyChanges = true;
      }
    }
    if (anyChanges) {
      this.currentViewOptionsInput = raw;
      this.currentViewOptionsRefined = refined;
    }
    return {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra
    };
  }
}
function buildDateEnv$1(timeZone, explicitLocale, weekNumberCalculation, firstDay, weekText, pluginHooks, availableLocaleData, defaultSeparator) {
  let locale = buildLocale(explicitLocale || availableLocaleData.defaultCode, availableLocaleData.map);
  return new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.S({
    calendarSystem: 'gregory',
    timeZone,
    namedTimeZoneImpl: pluginHooks.namedTimeZonedImpl,
    locale,
    weekNumberCalculation,
    firstDay,
    weekText,
    cmdFormatter: pluginHooks.cmdFormatter,
    defaultSeparator
  });
}
function buildTheme(options, pluginHooks) {
  let ThemeClass = pluginHooks.themeClasses[options.themeSystem] || StandardTheme;
  return new ThemeClass(options);
}
function buildDateProfileGenerator(props) {
  let DateProfileGeneratorClass = props.dateProfileGeneratorClass || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.U;
  return new DateProfileGeneratorClass(props);
}
function buildViewApi(type, getCurrentData, dateEnv) {
  return new ViewImpl(type, getCurrentData, dateEnv);
}
function buildEventUiBySource(eventSources) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(eventSources, eventSource => eventSource.ui);
}
function buildEventUiBases(eventDefs, eventUiSingleBase, eventUiBySource) {
  let eventUiBases = {
    '': eventUiSingleBase
  };
  for (let defId in eventDefs) {
    let def = eventDefs[defId];
    if (def.sourceId && eventUiBySource[def.sourceId]) {
      eventUiBases[defId] = eventUiBySource[def.sourceId];
    }
  }
  return eventUiBases;
}
function buildViewUiProps(calendarContext) {
  let {
    options
  } = calendarContext;
  return {
    eventUiSingleBase: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.W)({
      display: options.eventDisplay,
      editable: options.editable,
      startEditable: options.eventStartEditable,
      durationEditable: options.eventDurationEditable,
      constraint: options.eventConstraint,
      overlap: typeof options.eventOverlap === 'boolean' ? options.eventOverlap : undefined,
      allow: options.eventAllow,
      backgroundColor: options.eventBackgroundColor,
      borderColor: options.eventBorderColor,
      textColor: options.eventTextColor,
      color: options.eventColor
      // classNames: options.eventClassNames // render hook will handle this
    }, calendarContext),
    selectionConfig: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.W)({
      constraint: options.selectConstraint,
      overlap: typeof options.selectOverlap === 'boolean' ? options.selectOverlap : undefined,
      allow: options.selectAllow
    }, calendarContext)
  };
}
function computeIsLoading(state, context) {
  for (let isLoadingFunc of context.pluginHooks.isLoadingFuncs) {
    if (isLoadingFunc(state)) {
      return true;
    }
  }
  return false;
}
function parseContextBusinessHours(calendarContext) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.X)(calendarContext.options.businessHours, calendarContext);
}
function warnUnknownOptions(options, viewName) {
  for (let optionName in options) {
    console.warn(`Unknown option '${optionName}'` + (viewName ? ` for view '${viewName}'` : ''));
  }
}
class ToolbarSection extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let children = this.props.widgetGroups.map(widgetGroup => this.renderWidgetGroup(widgetGroup));
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      className: 'fc-toolbar-chunk'
    }, ...children);
  }
  renderWidgetGroup(widgetGroup) {
    let {
      props
    } = this;
    let {
      theme
    } = this.context;
    let children = [];
    let isOnlyButtons = true;
    for (let widget of widgetGroup) {
      let {
        buttonName,
        buttonClick,
        buttonText,
        buttonIcon,
        buttonHint
      } = widget;
      if (buttonName === 'title') {
        isOnlyButtons = false;
        children.push((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", {
          className: "fc-toolbar-title",
          id: props.titleId
        }, props.title));
      } else {
        let isPressed = buttonName === props.activeButton;
        let isDisabled = !props.isTodayEnabled && buttonName === 'today' || !props.isPrevEnabled && buttonName === 'prev' || !props.isNextEnabled && buttonName === 'next';
        let buttonClasses = [`fc-${buttonName}-button`, theme.getClass('button')];
        if (isPressed) {
          buttonClasses.push(theme.getClass('buttonActive'));
        }
        children.push((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
          type: "button",
          title: typeof buttonHint === 'function' ? buttonHint(props.navUnit) : buttonHint,
          disabled: isDisabled,
          "aria-pressed": isPressed,
          className: buttonClasses.join(' '),
          onClick: buttonClick
        }, buttonText || (buttonIcon ? (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          className: buttonIcon,
          role: "img"
        }) : '')));
      }
    }
    if (children.length > 1) {
      let groupClassName = isOnlyButtons && theme.getClass('buttonGroup') || '';
      return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        className: groupClassName
      }, ...children);
    }
    return children[0];
  }
}
class Toolbar extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      model,
      extraClassName
    } = this.props;
    let forceLtr = false;
    let startContent;
    let endContent;
    let sectionWidgets = model.sectionWidgets;
    let centerContent = sectionWidgets.center;
    if (sectionWidgets.left) {
      forceLtr = true;
      startContent = sectionWidgets.left;
    } else {
      startContent = sectionWidgets.start;
    }
    if (sectionWidgets.right) {
      forceLtr = true;
      endContent = sectionWidgets.right;
    } else {
      endContent = sectionWidgets.end;
    }
    let classNames = [extraClassName || '', 'fc-toolbar', forceLtr ? 'fc-toolbar-ltr' : ''];
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: classNames.join(' ')
    }, this.renderSection('start', startContent || []), this.renderSection('center', centerContent || []), this.renderSection('end', endContent || []));
  }
  renderSection(key, widgetGroups) {
    let {
      props
    } = this;
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ToolbarSection, {
      key: key,
      widgetGroups: widgetGroups,
      title: props.title,
      navUnit: props.navUnit,
      activeButton: props.activeButton,
      isTodayEnabled: props.isTodayEnabled,
      isPrevEnabled: props.isPrevEnabled,
      isNextEnabled: props.isNextEnabled,
      titleId: props.titleId
    });
  }
}
class ViewHarness extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  constructor() {
    super(...arguments);
    this.state = {
      availableWidth: null
    };
    this.handleEl = el => {
      this.el = el;
      (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.props.elRef, el);
      this.updateAvailableWidth();
    };
    this.handleResize = () => {
      this.updateAvailableWidth();
    };
  }
  render() {
    let {
      props,
      state
    } = this;
    let {
      aspectRatio
    } = props;
    let classNames = ['fc-view-harness', aspectRatio || props.liquid || props.height ? 'fc-view-harness-active' // harness controls the height
    : 'fc-view-harness-passive' // let the view do the height
    ];
    let height = '';
    let paddingBottom = '';
    if (aspectRatio) {
      if (state.availableWidth !== null) {
        height = state.availableWidth / aspectRatio;
      } else {
        // while waiting to know availableWidth, we can't set height to *zero*
        // because will cause lots of unnecessary scrollbars within scrollgrid.
        // BETTER: don't start rendering ANYTHING yet until we know container width
        // NOTE: why not always use paddingBottom? Causes height oscillation (issue 5606)
        paddingBottom = `${1 / aspectRatio * 100}%`;
      }
    } else {
      height = props.height || '';
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      "aria-labelledby": props.labeledById,
      ref: this.handleEl,
      className: classNames.join(' '),
      style: {
        height,
        paddingBottom
      }
    }, props.children);
  }
  componentDidMount() {
    this.context.addResizeHandler(this.handleResize);
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  updateAvailableWidth() {
    if (this.el &&
    // needed. but why?
    this.props.aspectRatio // aspectRatio is the only height setting that needs availableWidth
    ) {
      this.setState({
        availableWidth: this.el.offsetWidth
      });
    }
  }
}

/*
Detects when the user clicks on an event within a DateComponent
*/
class EventClicking extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    this.handleSegClick = (ev, segEl) => {
      let {
        component
      } = this;
      let {
        context
      } = component;
      let seg = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
      if (seg &&
      // might be the <div> surrounding the more link
      component.isValidSegDownEl(ev.target)) {
        // our way to simulate a link click for elements that can't be <a> tags
        // grab before trigger fired in case trigger trashes DOM thru rerendering
        let hasUrlContainer = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(ev.target, '.fc-event-forced-url');
        let url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : '';
        context.emitter.trigger('eventClick', {
          el: segEl,
          event: new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a0(component.context, seg.eventRange.def, seg.eventRange.instance),
          jsEvent: ev,
          view: context.viewApi
        });
        if (url && !ev.defaultPrevented) {
          window.location.href = url;
        }
      }
    };
    this.destroy = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a1)(settings.el, 'click', '.fc-event',
    // on both fg and bg events
    this.handleSegClick);
  }
}

/*
Triggers events and adds/removes core classNames when the user's pointer
enters/leaves event-elements of a component.
*/
class EventHovering extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
    this.handleEventElRemove = el => {
      if (el === this.currentSegEl) {
        this.handleSegLeave(null, this.currentSegEl);
      }
    };
    this.handleSegEnter = (ev, segEl) => {
      if ((0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl)) {
        // TODO: better way to make sure not hovering over more+ link or its wrapper
        this.currentSegEl = segEl;
        this.triggerEvent('eventMouseEnter', ev, segEl);
      }
    };
    this.handleSegLeave = (ev, segEl) => {
      if (this.currentSegEl) {
        this.currentSegEl = null;
        this.triggerEvent('eventMouseLeave', ev, segEl);
      }
    };
    this.removeHoverListeners = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a2)(settings.el, '.fc-event',
    // on both fg and bg events
    this.handleSegEnter, this.handleSegLeave);
  }
  destroy() {
    this.removeHoverListeners();
  }
  triggerEvent(publicEvName, ev, segEl) {
    let {
      component
    } = this;
    let {
      context
    } = component;
    let seg = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
    if (!ev || component.isValidSegDownEl(ev.target)) {
      context.emitter.trigger(publicEvName, {
        el: segEl,
        event: new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a0(context, seg.eventRange.def, seg.eventRange.instance),
        jsEvent: ev,
        view: context.viewApi
      });
    }
  }
}
class CalendarContent extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a3 {
  constructor() {
    super(...arguments);
    this.buildViewContext = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a4);
    this.buildViewPropTransformers = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewPropTransformers);
    this.buildToolbarProps = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildToolbarProps);
    this.headerRef = (0,preact__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.footerRef = (0,preact__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.interactionsStore = {};
    // eslint-disable-next-line
    this.state = {
      viewLabelId: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a5)()
    };
    // Component Registration
    // -----------------------------------------------------------------------------------------------------------------
    this.registerInteractiveComponent = (component, settingsInput) => {
      let settings = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a6)(component, settingsInput);
      let DEFAULT_INTERACTIONS = [EventClicking, EventHovering];
      let interactionClasses = DEFAULT_INTERACTIONS.concat(this.props.pluginHooks.componentInteractions);
      let interactions = interactionClasses.map(TheInteractionClass => new TheInteractionClass(settings));
      this.interactionsStore[component.uid] = interactions;
      _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a7[component.uid] = settings;
    };
    this.unregisterInteractiveComponent = component => {
      let listeners = this.interactionsStore[component.uid];
      if (listeners) {
        for (let listener of listeners) {
          listener.destroy();
        }
        delete this.interactionsStore[component.uid];
      }
      delete _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a7[component.uid];
    };
    // Resizing
    // -----------------------------------------------------------------------------------------------------------------
    this.resizeRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(() => {
      this.props.emitter.trigger('_resize', true); // should window resizes be considered "forced" ?
      this.props.emitter.trigger('windowResize', {
        view: this.props.viewApi
      });
    });
    this.handleWindowResize = ev => {
      let {
        options
      } = this.props;
      if (options.handleWindowResize && ev.target === window // avoid jqui events
      ) {
        this.resizeRunner.request(options.windowResizeDelay);
      }
    };
  }
  /*
  renders INSIDE of an outer div
  */
  render() {
    let {
      props
    } = this;
    let {
      toolbarConfig,
      options
    } = props;
    let toolbarProps = this.buildToolbarProps(props.viewSpec, props.dateProfile, props.dateProfileGenerator, props.currentDate, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a8)(props.options.now, props.dateEnv),
    // TODO: use NowTimer????
    props.viewTitle);
    let viewVGrow = false;
    let viewHeight = '';
    let viewAspectRatio;
    if (props.isHeightAuto || props.forPrint) {
      viewHeight = '';
    } else if (options.height != null) {
      viewVGrow = true;
    } else if (options.contentHeight != null) {
      viewHeight = options.contentHeight;
    } else {
      viewAspectRatio = Math.max(options.aspectRatio, 0.5); // prevent from getting too tall
    }
    let viewContext = this.buildViewContext(props.viewSpec, props.viewApi, props.options, props.dateProfileGenerator, props.dateEnv, props.theme, props.pluginHooks, props.dispatch, props.getCurrentData, props.emitter, props.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent);
    let viewLabelId = toolbarConfig.header && toolbarConfig.header.hasTitle ? this.state.viewLabelId : undefined;
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.V.Provider, {
      value: viewContext
    }, toolbarConfig.header && (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(Toolbar, Object.assign({
      ref: this.headerRef,
      extraClassName: "fc-header-toolbar",
      model: toolbarConfig.header,
      titleId: viewLabelId
    }, toolbarProps)), (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ViewHarness, {
      liquid: viewVGrow,
      height: viewHeight,
      aspectRatio: viewAspectRatio,
      labeledById: viewLabelId
    }, this.renderView(props), this.buildAppendContent()), toolbarConfig.footer && (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(Toolbar, Object.assign({
      ref: this.footerRef,
      extraClassName: "fc-footer-toolbar",
      model: toolbarConfig.footer,
      titleId: ""
    }, toolbarProps)));
  }
  componentDidMount() {
    let {
      props
    } = this;
    this.calendarInteractions = props.pluginHooks.calendarInteractions.map(CalendarInteractionClass => new CalendarInteractionClass(props));
    window.addEventListener('resize', this.handleWindowResize);
    let {
      propSetHandlers
    } = props.pluginHooks;
    for (let propName in propSetHandlers) {
      propSetHandlers[propName](props[propName], props);
    }
  }
  componentDidUpdate(prevProps) {
    let {
      props
    } = this;
    let {
      propSetHandlers
    } = props.pluginHooks;
    for (let propName in propSetHandlers) {
      if (props[propName] !== prevProps[propName]) {
        propSetHandlers[propName](props[propName], props);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.resizeRunner.clear();
    for (let interaction of this.calendarInteractions) {
      interaction.destroy();
    }
    this.props.emitter.trigger('_unmount');
  }
  buildAppendContent() {
    let {
      props
    } = this;
    let children = props.pluginHooks.viewContainerAppends.map(buildAppendContent => buildAppendContent(props));
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment, {}, ...children);
  }
  renderView(props) {
    let {
      pluginHooks
    } = props;
    let {
      viewSpec
    } = props;
    let viewProps = {
      dateProfile: props.dateProfile,
      businessHours: props.businessHours,
      eventStore: props.renderableEventStore,
      eventUiBases: props.eventUiBases,
      dateSelection: props.dateSelection,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      isHeightAuto: props.isHeightAuto,
      forPrint: props.forPrint
    };
    let transformers = this.buildViewPropTransformers(pluginHooks.viewPropsTransformers);
    for (let transformer of transformers) {
      Object.assign(viewProps, transformer.transform(viewProps, props));
    }
    let ViewComponent = viewSpec.component;
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ViewComponent, Object.assign({}, viewProps));
  }
}
function buildToolbarProps(viewSpec, dateProfile, dateProfileGenerator, currentDate, now, title) {
  // don't force any date-profiles to valid date profiles (the `false`) so that we can tell if it's invalid
  let todayInfo = dateProfileGenerator.build(now, undefined, false); // TODO: need `undefined` or else INFINITE LOOP for some reason
  let prevInfo = dateProfileGenerator.buildPrev(dateProfile, currentDate, false);
  let nextInfo = dateProfileGenerator.buildNext(dateProfile, currentDate, false);
  return {
    title,
    activeButton: viewSpec.type,
    navUnit: viewSpec.singleUnit,
    isTodayEnabled: todayInfo.isValid && !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.currentRange, now),
    isPrevEnabled: prevInfo.isValid,
    isNextEnabled: nextInfo.isValid
  };
}
// Plugin
// -----------------------------------------------------------------------------------------------------------------
function buildViewPropTransformers(theClasses) {
  return theClasses.map(TheClass => new TheClass());
}
class Calendar extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a9 {
  constructor(el, optionOverrides = {}) {
    super();
    this.isRendering = false;
    this.isRendered = false;
    this.currentClassNames = [];
    this.customContentRenderId = 0;
    this.handleAction = action => {
      // actions we know we want to render immediately
      switch (action.type) {
        case 'SET_EVENT_DRAG':
        case 'SET_EVENT_RESIZE':
          this.renderRunner.tryDrain();
      }
    };
    this.handleData = data => {
      this.currentData = data;
      this.renderRunner.request(data.calendarOptions.rerenderDelay);
    };
    this.handleRenderRequest = () => {
      if (this.isRendering) {
        this.isRendered = true;
        let {
          currentData
        } = this;
        (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.aa)(() => {
          (0,preact__WEBPACK_IMPORTED_MODULE_1__.render)((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ab, {
            options: currentData.calendarOptions,
            theme: currentData.theme,
            emitter: currentData.emitter
          }, (classNames, height, isHeightAuto, forPrint) => {
            this.setClassNames(classNames);
            this.setHeight(height);
            return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ac.Provider, {
              value: this.customContentRenderId
            }, (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(CalendarContent, Object.assign({
              isHeightAuto: isHeightAuto,
              forPrint: forPrint
            }, currentData)));
          }), this.el);
        });
      } else if (this.isRendered) {
        this.isRendered = false;
        (0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null, this.el);
        this.setClassNames([]);
        this.setHeight('');
      }
    };
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ad)(el);
    this.el = el;
    this.renderRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(this.handleRenderRequest);
    new CalendarDataManager({
      optionOverrides,
      calendarApi: this,
      onAction: this.handleAction,
      onData: this.handleData
    });
  }
  render() {
    let wasRendering = this.isRendering;
    if (!wasRendering) {
      this.isRendering = true;
    } else {
      this.customContentRenderId += 1;
    }
    this.renderRunner.request();
    if (wasRendering) {
      this.updateSize();
    }
  }
  destroy() {
    if (this.isRendering) {
      this.isRendering = false;
      this.renderRunner.request();
    }
  }
  updateSize() {
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.aa)(() => {
      super.updateSize();
    });
  }
  batchRendering(func) {
    this.renderRunner.pause('batchRendering');
    func();
    this.renderRunner.resume('batchRendering');
  }
  pauseRendering() {
    this.renderRunner.pause('pauseRendering');
  }
  resumeRendering() {
    this.renderRunner.resume('pauseRendering', true);
  }
  resetOptions(optionOverrides, changedOptionNames) {
    this.currentDataManager.resetOptions(optionOverrides, changedOptionNames);
  }
  setClassNames(classNames) {
    if (!(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(classNames, this.currentClassNames)) {
      let {
        classList
      } = this.el;
      for (let className of this.currentClassNames) {
        classList.remove(className);
      }
      for (let className of classNames) {
        classList.add(className);
      }
      this.currentClassNames = classNames;
    }
  }
  setHeight(height) {
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ae)(this.el, 'height', height);
  }
}
function formatDate(dateInput, options = {}) {
  let dateEnv = buildDateEnv(options);
  let formatter = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(options);
  let dateMeta = dateEnv.createMarkerMeta(dateInput);
  if (!dateMeta) {
    // TODO: warning?
    return '';
  }
  return dateEnv.format(dateMeta.marker, formatter, {
    forcedTzo: dateMeta.forcedTzo
  });
}
function formatRange(startInput, endInput, options) {
  let dateEnv = buildDateEnv(typeof options === 'object' && options ? options : {}); // pass in if non-null object
  let formatter = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(options);
  let startMeta = dateEnv.createMarkerMeta(startInput);
  let endMeta = dateEnv.createMarkerMeta(endInput);
  if (!startMeta || !endMeta) {
    // TODO: warning?
    return '';
  }
  return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
    forcedStartTzo: startMeta.forcedTzo,
    forcedEndTzo: endMeta.forcedTzo,
    isEndExclusive: options.isEndExclusive,
    defaultSeparator: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e.defaultRangeSeparator
  });
}
// TODO: more DRY and optimized
function buildDateEnv(settings) {
  let locale = buildLocale(settings.locale || 'en', organizeRawLocales([]).map); // TODO: don't hardcode 'en' everywhere
  return new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.S(Object.assign(Object.assign({
    timeZone: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e.timeZone,
    calendarSystem: 'gregory'
  }, settings), {
    locale
  }));
}

// HELPERS
/*
if nextDayThreshold is specified, slicing is done in an all-day fashion.
you can get nextDayThreshold from context.nextDayThreshold
*/
function sliceEvents(props, allDay) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.af)(props.eventStore, props.eventUiBases, props.dateProfile.activeRange, allDay ? props.nextDayThreshold : null).fg;
}
const version = '6.1.14';


/***/ }),

/***/ 3436:
/*!************************************************************!*\
  !*** ./node_modules/@fullcalendar/core/internal-common.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ elementClosest),
/* harmony export */   A: () => (/* binding */ memoizeObjArg),
/* harmony export */   B: () => (/* binding */ BaseComponent),
/* harmony export */   C: () => (/* binding */ ContentContainer),
/* harmony export */   D: () => (/* binding */ DelayedRunner),
/* harmony export */   E: () => (/* binding */ isPropsEqual),
/* harmony export */   F: () => (/* binding */ Emitter),
/* harmony export */   G: () => (/* binding */ getInitialDate),
/* harmony export */   H: () => (/* binding */ rangeContainsMarker),
/* harmony export */   I: () => (/* binding */ createEmptyEventStore),
/* harmony export */   J: () => (/* binding */ reduceCurrentDate),
/* harmony export */   K: () => (/* binding */ reduceEventStore),
/* harmony export */   L: () => (/* binding */ rezoneEventStoreDates),
/* harmony export */   M: () => (/* binding */ mergeRawOptions),
/* harmony export */   N: () => (/* binding */ BASE_OPTION_REFINERS),
/* harmony export */   O: () => (/* binding */ CALENDAR_LISTENER_REFINERS),
/* harmony export */   P: () => (/* binding */ CALENDAR_OPTION_REFINERS),
/* harmony export */   Q: () => (/* binding */ COMPLEX_OPTION_COMPARATORS),
/* harmony export */   R: () => (/* binding */ VIEW_OPTION_REFINERS),
/* harmony export */   S: () => (/* binding */ DateEnv),
/* harmony export */   T: () => (/* binding */ Theme),
/* harmony export */   U: () => (/* binding */ DateProfileGenerator),
/* harmony export */   V: () => (/* binding */ ViewContextType),
/* harmony export */   W: () => (/* binding */ createEventUi),
/* harmony export */   X: () => (/* binding */ parseBusinessHours),
/* harmony export */   Y: () => (/* binding */ setRef),
/* harmony export */   Z: () => (/* binding */ Interaction),
/* harmony export */   _: () => (/* binding */ getElSeg),
/* harmony export */   a: () => (/* binding */ mapHash),
/* harmony export */   a$: () => (/* binding */ getSlotClassNames),
/* harmony export */   a0: () => (/* binding */ EventImpl),
/* harmony export */   a1: () => (/* binding */ listenBySelector),
/* harmony export */   a2: () => (/* binding */ listenToHoverBySelector),
/* harmony export */   a3: () => (/* binding */ PureComponent),
/* harmony export */   a4: () => (/* binding */ buildViewContext),
/* harmony export */   a5: () => (/* binding */ getUniqueDomId),
/* harmony export */   a6: () => (/* binding */ parseInteractionSettings),
/* harmony export */   a7: () => (/* binding */ interactionSettingsStore),
/* harmony export */   a8: () => (/* binding */ getNow),
/* harmony export */   a9: () => (/* binding */ CalendarImpl),
/* harmony export */   aA: () => (/* binding */ diffDates),
/* harmony export */   aB: () => (/* binding */ removeExact),
/* harmony export */   aC: () => (/* binding */ memoizeArraylike),
/* harmony export */   aD: () => (/* binding */ memoizeHashlike),
/* harmony export */   aE: () => (/* binding */ intersectRects),
/* harmony export */   aF: () => (/* binding */ pointInsideRect),
/* harmony export */   aG: () => (/* binding */ constrainPoint),
/* harmony export */   aH: () => (/* binding */ getRectCenter),
/* harmony export */   aI: () => (/* binding */ diffPoints),
/* harmony export */   aJ: () => (/* binding */ translateRect),
/* harmony export */   aK: () => (/* binding */ compareObjs),
/* harmony export */   aL: () => (/* binding */ collectFromHash),
/* harmony export */   aM: () => (/* binding */ findElements),
/* harmony export */   aN: () => (/* binding */ findDirectChildren),
/* harmony export */   aO: () => (/* binding */ removeElement),
/* harmony export */   aP: () => (/* binding */ applyStyle),
/* harmony export */   aQ: () => (/* binding */ elementMatches),
/* harmony export */   aR: () => (/* binding */ getEventTargetViaRoot),
/* harmony export */   aS: () => (/* binding */ parseClassNames),
/* harmony export */   aT: () => (/* binding */ getCanVGrowWithinCell),
/* harmony export */   aU: () => (/* binding */ mergeEventStores),
/* harmony export */   aV: () => (/* binding */ getRelevantEvents),
/* harmony export */   aW: () => (/* binding */ eventTupleToStore),
/* harmony export */   aX: () => (/* binding */ combineEventUis),
/* harmony export */   aY: () => (/* binding */ Splitter),
/* harmony export */   aZ: () => (/* binding */ getDayClassNames),
/* harmony export */   a_: () => (/* binding */ getDateMeta),
/* harmony export */   aa: () => (/* binding */ flushSync),
/* harmony export */   ab: () => (/* binding */ CalendarRoot),
/* harmony export */   ac: () => (/* binding */ RenderId),
/* harmony export */   ad: () => (/* binding */ ensureElHasStyles),
/* harmony export */   ae: () => (/* binding */ applyStyleProp),
/* harmony export */   af: () => (/* binding */ sliceEventStore),
/* harmony export */   ag: () => (/* binding */ JsonRequestError),
/* harmony export */   ah: () => (/* binding */ createContext),
/* harmony export */   ai: () => (/* binding */ refineProps),
/* harmony export */   aj: () => (/* binding */ createEventInstance),
/* harmony export */   ak: () => (/* binding */ parseEventDef),
/* harmony export */   al: () => (/* binding */ refineEventDef),
/* harmony export */   am: () => (/* binding */ padStart),
/* harmony export */   an: () => (/* binding */ isInt),
/* harmony export */   ao: () => (/* binding */ parseFieldSpecs),
/* harmony export */   ap: () => (/* binding */ compareByFieldSpecs),
/* harmony export */   aq: () => (/* binding */ flexibleCompare),
/* harmony export */   ar: () => (/* binding */ preventSelection),
/* harmony export */   as: () => (/* binding */ allowSelection),
/* harmony export */   at: () => (/* binding */ preventContextMenu),
/* harmony export */   au: () => (/* binding */ allowContextMenu),
/* harmony export */   av: () => (/* binding */ compareNumbers),
/* harmony export */   aw: () => (/* binding */ enableCursor),
/* harmony export */   ax: () => (/* binding */ disableCursor),
/* harmony export */   ay: () => (/* binding */ computeVisibleDayRange),
/* harmony export */   az: () => (/* binding */ isMultiDayRange),
/* harmony export */   b: () => (/* binding */ buildViewClassNames),
/* harmony export */   b$: () => (/* binding */ SimpleScrollGrid),
/* harmony export */   b0: () => (/* binding */ buildNavLinkAttrs),
/* harmony export */   b1: () => (/* binding */ preventDefault),
/* harmony export */   b2: () => (/* binding */ whenTransitionDone),
/* harmony export */   b3: () => (/* binding */ computeInnerRect),
/* harmony export */   b4: () => (/* binding */ computeEdges),
/* harmony export */   b5: () => (/* binding */ getClippingParents),
/* harmony export */   b6: () => (/* binding */ computeRect),
/* harmony export */   b7: () => (/* binding */ rangesEqual),
/* harmony export */   b8: () => (/* binding */ rangesIntersect),
/* harmony export */   b9: () => (/* binding */ rangeContainsRange),
/* harmony export */   bA: () => (/* binding */ SegHierarchy),
/* harmony export */   bB: () => (/* binding */ buildEntryKey),
/* harmony export */   bC: () => (/* binding */ getEntrySpanEnd),
/* harmony export */   bD: () => (/* binding */ binarySearch),
/* harmony export */   bE: () => (/* binding */ groupIntersectingEntries),
/* harmony export */   bF: () => (/* binding */ intersectSpans),
/* harmony export */   bG: () => (/* binding */ interactionSettingsToStore),
/* harmony export */   bH: () => (/* binding */ ElementDragging),
/* harmony export */   bI: () => (/* binding */ config),
/* harmony export */   bJ: () => (/* binding */ parseDragMeta),
/* harmony export */   bK: () => (/* binding */ DayHeader),
/* harmony export */   bL: () => (/* binding */ computeFallbackHeaderFormat),
/* harmony export */   bM: () => (/* binding */ TableDateCell),
/* harmony export */   bN: () => (/* binding */ TableDowCell),
/* harmony export */   bO: () => (/* binding */ DaySeriesModel),
/* harmony export */   bP: () => (/* binding */ hasBgRendering),
/* harmony export */   bQ: () => (/* binding */ buildSegTimeText),
/* harmony export */   bR: () => (/* binding */ sortEventSegs),
/* harmony export */   bS: () => (/* binding */ getSegMeta),
/* harmony export */   bT: () => (/* binding */ buildEventRangeKey),
/* harmony export */   bU: () => (/* binding */ getSegAnchorAttrs),
/* harmony export */   bV: () => (/* binding */ DayTableModel),
/* harmony export */   bW: () => (/* binding */ Slicer),
/* harmony export */   bX: () => (/* binding */ applyMutationToEventStore),
/* harmony export */   bY: () => (/* binding */ isPropsValid),
/* harmony export */   bZ: () => (/* binding */ isInteractionValid),
/* harmony export */   b_: () => (/* binding */ isDateSelectionValid),
/* harmony export */   ba: () => (/* binding */ PositionCache),
/* harmony export */   bb: () => (/* binding */ ScrollController),
/* harmony export */   bc: () => (/* binding */ ElementScrollController),
/* harmony export */   bd: () => (/* binding */ WindowScrollController),
/* harmony export */   be: () => (/* binding */ DateComponent),
/* harmony export */   bf: () => (/* binding */ isDateSpansEqual),
/* harmony export */   bg: () => (/* binding */ addMs),
/* harmony export */   bh: () => (/* binding */ addWeeks),
/* harmony export */   bi: () => (/* binding */ diffWeeks),
/* harmony export */   bj: () => (/* binding */ diffWholeWeeks),
/* harmony export */   bk: () => (/* binding */ diffDayAndTime),
/* harmony export */   bl: () => (/* binding */ diffDays),
/* harmony export */   bm: () => (/* binding */ isValidDate),
/* harmony export */   bn: () => (/* binding */ asCleanDays),
/* harmony export */   bo: () => (/* binding */ multiplyDuration),
/* harmony export */   bp: () => (/* binding */ addDurations),
/* harmony export */   bq: () => (/* binding */ asRoughMinutes),
/* harmony export */   br: () => (/* binding */ asRoughSeconds),
/* harmony export */   bs: () => (/* binding */ asRoughMs),
/* harmony export */   bt: () => (/* binding */ wholeDivideDurations),
/* harmony export */   bu: () => (/* binding */ formatIsoTimeString),
/* harmony export */   bv: () => (/* binding */ formatDayString),
/* harmony export */   bw: () => (/* binding */ buildIsoString),
/* harmony export */   bx: () => (/* binding */ formatIsoMonthStr),
/* harmony export */   by: () => (/* binding */ NamedTimeZoneImpl),
/* harmony export */   bz: () => (/* binding */ parse),
/* harmony export */   c: () => (/* binding */ greatestDurationDenominator),
/* harmony export */   c0: () => (/* binding */ hasShrinkWidth),
/* harmony export */   c1: () => (/* binding */ renderMicroColGroup),
/* harmony export */   c2: () => (/* binding */ getScrollGridClassNames),
/* harmony export */   c3: () => (/* binding */ getSectionClassNames),
/* harmony export */   c4: () => (/* binding */ getSectionHasLiquidHeight),
/* harmony export */   c5: () => (/* binding */ getAllowYScrolling),
/* harmony export */   c6: () => (/* binding */ renderChunkContent),
/* harmony export */   c7: () => (/* binding */ computeShrinkWidth),
/* harmony export */   c8: () => (/* binding */ sanitizeShrinkWidth),
/* harmony export */   c9: () => (/* binding */ isColPropsEqual),
/* harmony export */   ca: () => (/* binding */ renderScrollShim),
/* harmony export */   cb: () => (/* binding */ getStickyFooterScrollbar),
/* harmony export */   cc: () => (/* binding */ getStickyHeaderDates),
/* harmony export */   cd: () => (/* binding */ Scroller),
/* harmony export */   ce: () => (/* binding */ getScrollbarWidths),
/* harmony export */   cf: () => (/* binding */ RefMap),
/* harmony export */   cg: () => (/* binding */ getIsRtlScrollbarOnLeft),
/* harmony export */   ch: () => (/* binding */ NowTimer),
/* harmony export */   ci: () => (/* binding */ ScrollResponder),
/* harmony export */   cj: () => (/* binding */ StandardEvent),
/* harmony export */   ck: () => (/* binding */ NowIndicatorContainer),
/* harmony export */   cl: () => (/* binding */ DayCellContainer),
/* harmony export */   cm: () => (/* binding */ hasCustomDayCellContent),
/* harmony export */   cn: () => (/* binding */ EventContainer),
/* harmony export */   co: () => (/* binding */ renderFill),
/* harmony export */   cp: () => (/* binding */ BgEvent),
/* harmony export */   cq: () => (/* binding */ WeekNumberContainer),
/* harmony export */   cr: () => (/* binding */ MoreLinkContainer),
/* harmony export */   cs: () => (/* binding */ computeEarliestSegStart),
/* harmony export */   ct: () => (/* binding */ ViewContainer),
/* harmony export */   cu: () => (/* binding */ triggerDateSelect),
/* harmony export */   cv: () => (/* binding */ getDefaultEventEnd),
/* harmony export */   cw: () => (/* binding */ injectStyles),
/* harmony export */   cx: () => (/* binding */ buildElAttrs),
/* harmony export */   cy: () => (/* binding */ CustomRenderingStore),
/* harmony export */   d: () => (/* binding */ createDuration),
/* harmony export */   e: () => (/* binding */ BASE_OPTION_DEFAULTS),
/* harmony export */   f: () => (/* binding */ arrayToHash),
/* harmony export */   g: () => (/* binding */ guid),
/* harmony export */   h: () => (/* binding */ filterHash),
/* harmony export */   i: () => (/* binding */ isArraysEqual),
/* harmony export */   j: () => (/* binding */ buildEventSourceRefiners),
/* harmony export */   k: () => (/* binding */ formatWithOrdinals),
/* harmony export */   l: () => (/* binding */ buildRangeApiWithTimeZone),
/* harmony export */   m: () => (/* binding */ mergeProps),
/* harmony export */   n: () => (/* binding */ identity),
/* harmony export */   o: () => (/* binding */ intersectRanges),
/* harmony export */   p: () => (/* binding */ parseEventSource),
/* harmony export */   q: () => (/* binding */ startOfDay),
/* harmony export */   r: () => (/* binding */ requestJson),
/* harmony export */   s: () => (/* binding */ subtractDurations),
/* harmony export */   t: () => (/* binding */ addDays),
/* harmony export */   u: () => (/* binding */ unpromisify),
/* harmony export */   v: () => (/* binding */ hashValuesToArray),
/* harmony export */   w: () => (/* binding */ buildEventApis),
/* harmony export */   x: () => (/* binding */ createFormatter),
/* harmony export */   y: () => (/* binding */ diffWholeDays),
/* harmony export */   z: () => (/* binding */ memoize)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 8048);
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/compat */ 174);



const styleTexts = [];
const styleEls = new Map();
function injectStyles(styleText) {
  styleTexts.push(styleText);
  styleEls.forEach(styleEl => {
    appendStylesTo(styleEl, styleText);
  });
}
function ensureElHasStyles(el) {
  if (el.isConnected &&
  // sometimes true if SSR system simulates DOM
  el.getRootNode // sometimes undefined if SSR system simulates DOM
  ) {
    registerStylesRoot(el.getRootNode());
  }
}
function registerStylesRoot(rootNode) {
  let styleEl = styleEls.get(rootNode);
  if (!styleEl || !styleEl.isConnected) {
    styleEl = rootNode.querySelector('style[data-fullcalendar]');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-fullcalendar', '');
      const nonce = getNonceValue();
      if (nonce) {
        styleEl.nonce = nonce;
      }
      const parentEl = rootNode === document ? document.head : rootNode;
      const insertBefore = rootNode === document ? parentEl.querySelector('script,link[rel=stylesheet],link[as=style],style') : parentEl.firstChild;
      parentEl.insertBefore(styleEl, insertBefore);
    }
    styleEls.set(rootNode, styleEl);
    hydrateStylesRoot(styleEl);
  }
}
function hydrateStylesRoot(styleEl) {
  for (const styleText of styleTexts) {
    appendStylesTo(styleEl, styleText);
  }
}
function appendStylesTo(styleEl, styleText) {
  const {
    sheet
  } = styleEl;
  const ruleCnt = sheet.cssRules.length;
  styleText.split('}').forEach((styleStr, i) => {
    styleStr = styleStr.trim();
    if (styleStr) {
      sheet.insertRule(styleStr + '}', ruleCnt + i);
    }
  });
}
// nonce
// -------------------------------------------------------------------------------------------------
let queriedNonceValue;
function getNonceValue() {
  if (queriedNonceValue === undefined) {
    queriedNonceValue = queryNonceValue();
  }
  return queriedNonceValue;
}
/*
TODO: discourage meta tag and instead put nonce attribute on placeholder <style> tag
*/
function queryNonceValue() {
  const metaWithNonce = document.querySelector('meta[name="csp-nonce"]');
  if (metaWithNonce && metaWithNonce.hasAttribute('content')) {
    return metaWithNonce.getAttribute('content');
  }
  const elWithNonce = document.querySelector('script[nonce]');
  if (elWithNonce) {
    return elWithNonce.nonce || '';
  }
  return '';
}
// main
// -------------------------------------------------------------------------------------------------
if (typeof document !== 'undefined') {
  registerStylesRoot(document);
}
var css_248z = ":root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\") format(\"truetype\")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:\"\\e900\"}.fc-icon-chevron-right:before{content:\"\\e901\"}.fc-icon-chevrons-left:before{content:\"\\e902\"}.fc-icon-chevrons-right:before{content:\"\\e903\"}.fc-icon-minus-square:before{content:\"\\e904\"}.fc-icon-plus-square:before{content:\"\\e905\"}.fc-icon-x:before{content:\"\\e906\"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:\"\";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:\"\";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:\"\";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}";
injectStyles(css_248z);
class DelayedRunner {
  constructor(drainedOption) {
    this.drainedOption = drainedOption;
    this.isRunning = false;
    this.isDirty = false;
    this.pauseDepths = {};
    this.timeoutId = 0;
  }
  request(delay) {
    this.isDirty = true;
    if (!this.isPaused()) {
      this.clearTimeout();
      if (delay == null) {
        this.tryDrain();
      } else {
        this.timeoutId = setTimeout(
        // NOT OPTIMAL! TODO: look at debounce
        this.tryDrain.bind(this), delay);
      }
    }
  }
  pause(scope = '') {
    let {
      pauseDepths
    } = this;
    pauseDepths[scope] = (pauseDepths[scope] || 0) + 1;
    this.clearTimeout();
  }
  resume(scope = '', force) {
    let {
      pauseDepths
    } = this;
    if (scope in pauseDepths) {
      if (force) {
        delete pauseDepths[scope];
      } else {
        pauseDepths[scope] -= 1;
        let depth = pauseDepths[scope];
        if (depth <= 0) {
          delete pauseDepths[scope];
        }
      }
      this.tryDrain();
    }
  }
  isPaused() {
    return Object.keys(this.pauseDepths).length;
  }
  tryDrain() {
    if (!this.isRunning && !this.isPaused()) {
      this.isRunning = true;
      while (this.isDirty) {
        this.isDirty = false;
        this.drained(); // might set isDirty to true again
      }
      this.isRunning = false;
    }
  }
  clear() {
    this.clearTimeout();
    this.isDirty = false;
    this.pauseDepths = {};
  }
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = 0;
    }
  }
  drained() {
    if (this.drainedOption) {
      this.drainedOption();
    }
  }
}
function removeElement(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}
// Querying
// ----------------------------------------------------------------------------------------------------------------
function elementClosest(el, selector) {
  if (el.closest) {
    return el.closest(selector);
    // really bad fallback for IE
    // from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  }
  if (!document.documentElement.contains(el)) {
    return null;
  }
  do {
    if (elementMatches(el, selector)) {
      return el;
    }
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);
  return null;
}
function elementMatches(el, selector) {
  let method = el.matches || el.matchesSelector || el.msMatchesSelector;
  return method.call(el, selector);
}
// accepts multiple subject els
// returns a real array. good for methods like forEach
// TODO: accept the document
function findElements(container, selector) {
  let containers = container instanceof HTMLElement ? [container] : container;
  let allMatches = [];
  for (let i = 0; i < containers.length; i += 1) {
    let matches = containers[i].querySelectorAll(selector);
    for (let j = 0; j < matches.length; j += 1) {
      allMatches.push(matches[j]);
    }
  }
  return allMatches;
}
// accepts multiple subject els
// only queries direct child elements // TODO: rename to findDirectChildren!
function findDirectChildren(parent, selector) {
  let parents = parent instanceof HTMLElement ? [parent] : parent;
  let allMatches = [];
  for (let i = 0; i < parents.length; i += 1) {
    let childNodes = parents[i].children; // only ever elements
    for (let j = 0; j < childNodes.length; j += 1) {
      let childNode = childNodes[j];
      if (!selector || elementMatches(childNode, selector)) {
        allMatches.push(childNode);
      }
    }
  }
  return allMatches;
}
// Style
// ----------------------------------------------------------------------------------------------------------------
const PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i;
function applyStyle(el, props) {
  for (let propName in props) {
    applyStyleProp(el, propName, props[propName]);
  }
}
function applyStyleProp(el, name, val) {
  if (val == null) {
    el.style[name] = '';
  } else if (typeof val === 'number' && PIXEL_PROP_RE.test(name)) {
    el.style[name] = `${val}px`;
  } else {
    el.style[name] = val;
  }
}
// Event Handling
// ----------------------------------------------------------------------------------------------------------------
// if intercepting bubbled events at the document/window/body level,
// and want to see originating element (the 'target'), use this util instead
// of `ev.target` because it goes within web-component boundaries.
function getEventTargetViaRoot(ev) {
  var _a, _b;
  return (_b = (_a = ev.composedPath) === null || _a === void 0 ? void 0 : _a.call(ev)[0]) !== null && _b !== void 0 ? _b : ev.target;
}
// Unique ID for DOM attribute
let guid$1 = 0;
function getUniqueDomId() {
  guid$1 += 1;
  return 'fc-dom-' + guid$1;
}

// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
  ev.preventDefault();
}
// Event Delegation
// ----------------------------------------------------------------------------------------------------------------
function buildDelegationHandler(selector, handler) {
  return ev => {
    let matchedChild = elementClosest(ev.target, selector);
    if (matchedChild) {
      handler.call(matchedChild, ev, matchedChild);
    }
  };
}
function listenBySelector(container, eventType, selector, handler) {
  let attachedHandler = buildDelegationHandler(selector, handler);
  container.addEventListener(eventType, attachedHandler);
  return () => {
    container.removeEventListener(eventType, attachedHandler);
  };
}
function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
  let currentMatchedChild;
  return listenBySelector(container, 'mouseover', selector, (mouseOverEv, matchedChild) => {
    if (matchedChild !== currentMatchedChild) {
      currentMatchedChild = matchedChild;
      onMouseEnter(mouseOverEv, matchedChild);
      let realOnMouseLeave = mouseLeaveEv => {
        currentMatchedChild = null;
        onMouseLeave(mouseLeaveEv, matchedChild);
        matchedChild.removeEventListener('mouseleave', realOnMouseLeave);
      };
      // listen to the next mouseleave, and then unattach
      matchedChild.addEventListener('mouseleave', realOnMouseLeave);
    }
  });
}
// Animation
// ----------------------------------------------------------------------------------------------------------------
const transitionEventNames = ['webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend'];
// triggered only when the next single subsequent transition finishes
function whenTransitionDone(el, callback) {
  let realCallback = ev => {
    callback(ev);
    transitionEventNames.forEach(eventName => {
      el.removeEventListener(eventName, realCallback);
    });
  };
  transitionEventNames.forEach(eventName => {
    el.addEventListener(eventName, realCallback); // cross-browser way to determine when the transition finishes
  });
}
// ARIA workarounds
// ----------------------------------------------------------------------------------------------------------------
function createAriaClickAttrs(handler) {
  return Object.assign({
    onClick: handler
  }, createAriaKeyboardAttrs(handler));
}
function createAriaKeyboardAttrs(handler) {
  return {
    tabIndex: 0,
    onKeyDown(ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        handler(ev);
        ev.preventDefault(); // if space, don't scroll down page
      }
    }
  };
}
let guidNumber = 0;
function guid() {
  guidNumber += 1;
  return String(guidNumber);
}
/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/
// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
  document.body.classList.add('fc-not-allowed');
}
// Returns the mouse cursor to its original look
function enableCursor() {
  document.body.classList.remove('fc-not-allowed');
}
/* Selection
----------------------------------------------------------------------------------------------------------------------*/
function preventSelection(el) {
  el.style.userSelect = 'none';
  el.style.webkitUserSelect = 'none';
  el.addEventListener('selectstart', preventDefault);
}
function allowSelection(el) {
  el.style.userSelect = '';
  el.style.webkitUserSelect = '';
  el.removeEventListener('selectstart', preventDefault);
}
/* Context Menu
----------------------------------------------------------------------------------------------------------------------*/
function preventContextMenu(el) {
  el.addEventListener('contextmenu', preventDefault);
}
function allowContextMenu(el) {
  el.removeEventListener('contextmenu', preventDefault);
}
function parseFieldSpecs(input) {
  let specs = [];
  let tokens = [];
  let i;
  let token;
  if (typeof input === 'string') {
    tokens = input.split(/\s*,\s*/);
  } else if (typeof input === 'function') {
    tokens = [input];
  } else if (Array.isArray(input)) {
    tokens = input;
  }
  for (i = 0; i < tokens.length; i += 1) {
    token = tokens[i];
    if (typeof token === 'string') {
      specs.push(token.charAt(0) === '-' ? {
        field: token.substring(1),
        order: -1
      } : {
        field: token,
        order: 1
      });
    } else if (typeof token === 'function') {
      specs.push({
        func: token
      });
    }
  }
  return specs;
}
function compareByFieldSpecs(obj0, obj1, fieldSpecs) {
  let i;
  let cmp;
  for (i = 0; i < fieldSpecs.length; i += 1) {
    cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i]);
    if (cmp) {
      return cmp;
    }
  }
  return 0;
}
function compareByFieldSpec(obj0, obj1, fieldSpec) {
  if (fieldSpec.func) {
    return fieldSpec.func(obj0, obj1);
  }
  return flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field]) * (fieldSpec.order || 1);
}
function flexibleCompare(a, b) {
  if (!a && !b) {
    return 0;
  }
  if (b == null) {
    return -1;
  }
  if (a == null) {
    return 1;
  }
  if (typeof a === 'string' || typeof b === 'string') {
    return String(a).localeCompare(String(b));
  }
  return a - b;
}
/* String Utilities
----------------------------------------------------------------------------------------------------------------------*/
function padStart(val, len) {
  let s = String(val);
  return '000'.substr(0, len - s.length) + s;
}
function formatWithOrdinals(formatter, args, fallbackText) {
  if (typeof formatter === 'function') {
    return formatter(...args);
  }
  if (typeof formatter === 'string') {
    // non-blank string
    return args.reduce((str, arg, index) => str.replace('$' + index, arg || ''), formatter);
  }
  return fallbackText;
}
/* Number Utilities
----------------------------------------------------------------------------------------------------------------------*/
function compareNumbers(a, b) {
  return a - b;
}
function isInt(n) {
  return n % 1 === 0;
}
/* FC-specific DOM dimension stuff
----------------------------------------------------------------------------------------------------------------------*/
function computeSmallestCellWidth(cellEl) {
  let allWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-frame');
  let contentWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-cushion');
  if (!allWidthEl) {
    throw new Error('needs fc-scrollgrid-shrink-frame className'); // TODO: use const
  }
  if (!contentWidthEl) {
    throw new Error('needs fc-scrollgrid-shrink-cushion className');
  }
  return cellEl.getBoundingClientRect().width - allWidthEl.getBoundingClientRect().width +
  // the cell padding+border
  contentWidthEl.getBoundingClientRect().width;
}
const INTERNAL_UNITS = ['years', 'months', 'days', 'milliseconds'];
const PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
// Parsing and Creation
function createDuration(input, unit) {
  if (typeof input === 'string') {
    return parseString(input);
  }
  if (typeof input === 'object' && input) {
    // non-null object
    return parseObject(input);
  }
  if (typeof input === 'number') {
    return parseObject({
      [unit || 'milliseconds']: input
    });
  }
  return null;
}
function parseString(s) {
  let m = PARSE_RE.exec(s);
  if (m) {
    let sign = m[1] ? -1 : 1;
    return {
      years: 0,
      months: 0,
      days: sign * (m[2] ? parseInt(m[2], 10) : 0),
      milliseconds: sign * ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1000 +
      // hours
      (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1000 +
      // minutes
      (m[5] ? parseInt(m[5], 10) : 0) * 1000 + (
      // seconds
      m[6] ? parseInt(m[6], 10) : 0) // ms
      )
    };
  }
  return null;
}
function parseObject(obj) {
  let duration = {
    years: obj.years || obj.year || 0,
    months: obj.months || obj.month || 0,
    days: obj.days || obj.day || 0,
    milliseconds: (obj.hours || obj.hour || 0) * 60 * 60 * 1000 +
    // hours
    (obj.minutes || obj.minute || 0) * 60 * 1000 +
    // minutes
    (obj.seconds || obj.second || 0) * 1000 + (
    // seconds
    obj.milliseconds || obj.millisecond || obj.ms || 0) // ms
  };
  let weeks = obj.weeks || obj.week;
  if (weeks) {
    duration.days += weeks * 7;
    duration.specifiedWeeks = true;
  }
  return duration;
}
// Equality
function durationsEqual(d0, d1) {
  return d0.years === d1.years && d0.months === d1.months && d0.days === d1.days && d0.milliseconds === d1.milliseconds;
}
function asCleanDays(dur) {
  if (!dur.years && !dur.months && !dur.milliseconds) {
    return dur.days;
  }
  return 0;
}
// Simple Math
function addDurations(d0, d1) {
  return {
    years: d0.years + d1.years,
    months: d0.months + d1.months,
    days: d0.days + d1.days,
    milliseconds: d0.milliseconds + d1.milliseconds
  };
}
function subtractDurations(d1, d0) {
  return {
    years: d1.years - d0.years,
    months: d1.months - d0.months,
    days: d1.days - d0.days,
    milliseconds: d1.milliseconds - d0.milliseconds
  };
}
function multiplyDuration(d, n) {
  return {
    years: d.years * n,
    months: d.months * n,
    days: d.days * n,
    milliseconds: d.milliseconds * n
  };
}
// Conversions
// "Rough" because they are based on average-case Gregorian months/years
function asRoughYears(dur) {
  return asRoughDays(dur) / 365;
}
function asRoughMonths(dur) {
  return asRoughDays(dur) / 30;
}
function asRoughDays(dur) {
  return asRoughMs(dur) / 864e5;
}
function asRoughMinutes(dur) {
  return asRoughMs(dur) / (1000 * 60);
}
function asRoughSeconds(dur) {
  return asRoughMs(dur) / 1000;
}
function asRoughMs(dur) {
  return dur.years * (365 * 864e5) + dur.months * (30 * 864e5) + dur.days * 864e5 + dur.milliseconds;
}
// Advanced Math
function wholeDivideDurations(numerator, denominator) {
  let res = null;
  for (let i = 0; i < INTERNAL_UNITS.length; i += 1) {
    let unit = INTERNAL_UNITS[i];
    if (denominator[unit]) {
      let localRes = numerator[unit] / denominator[unit];
      if (!isInt(localRes) || res !== null && res !== localRes) {
        return null;
      }
      res = localRes;
    } else if (numerator[unit]) {
      // needs to divide by something but can't!
      return null;
    }
  }
  return res;
}
function greatestDurationDenominator(dur) {
  let ms = dur.milliseconds;
  if (ms) {
    if (ms % 1000 !== 0) {
      return {
        unit: 'millisecond',
        value: ms
      };
    }
    if (ms % (1000 * 60) !== 0) {
      return {
        unit: 'second',
        value: ms / 1000
      };
    }
    if (ms % (1000 * 60 * 60) !== 0) {
      return {
        unit: 'minute',
        value: ms / (1000 * 60)
      };
    }
    if (ms) {
      return {
        unit: 'hour',
        value: ms / (1000 * 60 * 60)
      };
    }
  }
  if (dur.days) {
    if (dur.specifiedWeeks && dur.days % 7 === 0) {
      return {
        unit: 'week',
        value: dur.days / 7
      };
    }
    return {
      unit: 'day',
      value: dur.days
    };
  }
  if (dur.months) {
    return {
      unit: 'month',
      value: dur.months
    };
  }
  if (dur.years) {
    return {
      unit: 'year',
      value: dur.years
    };
  }
  return {
    unit: 'millisecond',
    value: 0
  };
}

// TODO: new util arrayify?
function removeExact(array, exactVal) {
  let removeCnt = 0;
  let i = 0;
  while (i < array.length) {
    if (array[i] === exactVal) {
      array.splice(i, 1);
      removeCnt += 1;
    } else {
      i += 1;
    }
  }
  return removeCnt;
}
function isArraysEqual(a0, a1, equalityFunc) {
  if (a0 === a1) {
    return true;
  }
  let len = a0.length;
  let i;
  if (len !== a1.length) {
    // not array? or not same length?
    return false;
  }
  for (i = 0; i < len; i += 1) {
    if (!(equalityFunc ? equalityFunc(a0[i], a1[i]) : a0[i] === a1[i])) {
      return false;
    }
  }
  return true;
}
const DAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// Adding
function addWeeks(m, n) {
  let a = dateToUtcArray(m);
  a[2] += n * 7;
  return arrayToUtcDate(a);
}
function addDays(m, n) {
  let a = dateToUtcArray(m);
  a[2] += n;
  return arrayToUtcDate(a);
}
function addMs(m, n) {
  let a = dateToUtcArray(m);
  a[6] += n;
  return arrayToUtcDate(a);
}
// Diffing (all return floats)
// TODO: why not use ranges?
function diffWeeks(m0, m1) {
  return diffDays(m0, m1) / 7;
}
function diffDays(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60 * 24);
}
function diffHours(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60);
}
function diffMinutes(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60);
}
function diffSeconds(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / 1000;
}
function diffDayAndTime(m0, m1) {
  let m0day = startOfDay(m0);
  let m1day = startOfDay(m1);
  return {
    years: 0,
    months: 0,
    days: Math.round(diffDays(m0day, m1day)),
    milliseconds: m1.valueOf() - m1day.valueOf() - (m0.valueOf() - m0day.valueOf())
  };
}
// Diffing Whole Units
function diffWholeWeeks(m0, m1) {
  let d = diffWholeDays(m0, m1);
  if (d !== null && d % 7 === 0) {
    return d / 7;
  }
  return null;
}
function diffWholeDays(m0, m1) {
  if (timeAsMs(m0) === timeAsMs(m1)) {
    return Math.round(diffDays(m0, m1));
  }
  return null;
}
// Start-Of
function startOfDay(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate()]);
}
function startOfHour(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours()]);
}
function startOfMinute(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes()]);
}
function startOfSecond(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes(), m.getUTCSeconds()]);
}
// Week Computation
function weekOfYear(marker, dow, doy) {
  let y = marker.getUTCFullYear();
  let w = weekOfGivenYear(marker, y, dow, doy);
  if (w < 1) {
    return weekOfGivenYear(marker, y - 1, dow, doy);
  }
  let nextW = weekOfGivenYear(marker, y + 1, dow, doy);
  if (nextW >= 1) {
    return Math.min(w, nextW);
  }
  return w;
}
function weekOfGivenYear(marker, year, dow, doy) {
  let firstWeekStart = arrayToUtcDate([year, 0, 1 + firstWeekOffset(year, dow, doy)]);
  let dayStart = startOfDay(marker);
  let days = Math.round(diffDays(firstWeekStart, dayStart));
  return Math.floor(days / 7) + 1; // zero-indexed
}
// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
  // first-week day -- which january is always in the first week (4 for iso, 1 for other)
  let fwd = 7 + dow - doy;
  // first-week day local weekday -- which local weekday is fwd
  let fwdlw = (7 + arrayToUtcDate([year, 0, fwd]).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
// Array Conversion
function dateToLocalArray(date) {
  return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
}
function arrayToLocalDate(a) {
  return new Date(a[0], a[1] || 0, a[2] == null ? 1 : a[2],
  // day of month
  a[3] || 0, a[4] || 0, a[5] || 0);
}
function dateToUtcArray(date) {
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()];
}
function arrayToUtcDate(a) {
  // according to web standards (and Safari), a month index is required.
  // massage if only given a year.
  if (a.length === 1) {
    a = a.concat([0]);
  }
  return new Date(Date.UTC(...a));
}
// Other Utils
function isValidDate(m) {
  return !isNaN(m.valueOf());
}
function timeAsMs(m) {
  return m.getUTCHours() * 1000 * 60 * 60 + m.getUTCMinutes() * 1000 * 60 + m.getUTCSeconds() * 1000 + m.getUTCMilliseconds();
}

// timeZoneOffset is in minutes
function buildIsoString(marker, timeZoneOffset, stripZeroTime = false) {
  let s = marker.toISOString();
  s = s.replace('.000', '');
  if (stripZeroTime) {
    s = s.replace('T00:00:00Z', '');
  }
  if (s.length > 10) {
    // time part wasn't stripped, can add timezone info
    if (timeZoneOffset == null) {
      s = s.replace('Z', '');
    } else if (timeZoneOffset !== 0) {
      s = s.replace('Z', formatTimeZoneOffset(timeZoneOffset, true));
    }
    // otherwise, its UTC-0 and we want to keep the Z
  }
  return s;
}
// formats the date, but with no time part
// TODO: somehow merge with buildIsoString and stripZeroTime
// TODO: rename. omit "string"
function formatDayString(marker) {
  return marker.toISOString().replace(/T.*$/, '');
}
function formatIsoMonthStr(marker) {
  return marker.toISOString().match(/^\d{4}-\d{2}/)[0];
}
// TODO: use Date::toISOString and use everything after the T?
function formatIsoTimeString(marker) {
  return padStart(marker.getUTCHours(), 2) + ':' + padStart(marker.getUTCMinutes(), 2) + ':' + padStart(marker.getUTCSeconds(), 2);
}
function formatTimeZoneOffset(minutes, doIso = false) {
  let sign = minutes < 0 ? '-' : '+';
  let abs = Math.abs(minutes);
  let hours = Math.floor(abs / 60);
  let mins = Math.round(abs % 60);
  if (doIso) {
    return `${sign + padStart(hours, 2)}:${padStart(mins, 2)}`;
  }
  return `GMT${sign}${hours}${mins ? `:${padStart(mins, 2)}` : ''}`;
}
function memoize(workerFunc, resEquality, teardownFunc) {
  let currentArgs;
  let currentRes;
  return function (...newArgs) {
    if (!currentArgs) {
      currentRes = workerFunc.apply(this, newArgs);
    } else if (!isArraysEqual(currentArgs, newArgs)) {
      if (teardownFunc) {
        teardownFunc(currentRes);
      }
      let res = workerFunc.apply(this, newArgs);
      if (!resEquality || !resEquality(res, currentRes)) {
        currentRes = res;
      }
    }
    currentArgs = newArgs;
    return currentRes;
  };
}
function memoizeObjArg(workerFunc, resEquality, teardownFunc) {
  let currentArg;
  let currentRes;
  return newArg => {
    if (!currentArg) {
      currentRes = workerFunc.call(this, newArg);
    } else if (!isPropsEqual(currentArg, newArg)) {
      if (teardownFunc) {
        teardownFunc(currentRes);
      }
      let res = workerFunc.call(this, newArg);
      if (!resEquality || !resEquality(res, currentRes)) {
        currentRes = res;
      }
    }
    currentArg = newArg;
    return currentRes;
  };
}
function memoizeArraylike(
// used at all?
workerFunc, resEquality, teardownFunc) {
  let currentArgSets = [];
  let currentResults = [];
  return newArgSets => {
    let currentLen = currentArgSets.length;
    let newLen = newArgSets.length;
    let i = 0;
    for (; i < currentLen; i += 1) {
      if (!newArgSets[i]) {
        // one of the old sets no longer exists
        if (teardownFunc) {
          teardownFunc(currentResults[i]);
        }
      } else if (!isArraysEqual(currentArgSets[i], newArgSets[i])) {
        if (teardownFunc) {
          teardownFunc(currentResults[i]);
        }
        let res = workerFunc.apply(this, newArgSets[i]);
        if (!resEquality || !resEquality(res, currentResults[i])) {
          currentResults[i] = res;
        }
      }
    }
    for (; i < newLen; i += 1) {
      currentResults[i] = workerFunc.apply(this, newArgSets[i]);
    }
    currentArgSets = newArgSets;
    currentResults.splice(newLen); // remove excess
    return currentResults;
  };
}
function memoizeHashlike(workerFunc, resEquality, teardownFunc) {
  let currentArgHash = {};
  let currentResHash = {};
  return newArgHash => {
    let newResHash = {};
    for (let key in newArgHash) {
      if (!currentResHash[key]) {
        newResHash[key] = workerFunc.apply(this, newArgHash[key]);
      } else if (!isArraysEqual(currentArgHash[key], newArgHash[key])) {
        if (teardownFunc) {
          teardownFunc(currentResHash[key]);
        }
        let res = workerFunc.apply(this, newArgHash[key]);
        newResHash[key] = resEquality && resEquality(res, currentResHash[key]) ? currentResHash[key] : res;
      } else {
        newResHash[key] = currentResHash[key];
      }
    }
    currentArgHash = newArgHash;
    currentResHash = newResHash;
    return newResHash;
  };
}
const EXTENDED_SETTINGS_AND_SEVERITIES = {
  week: 3,
  separator: 0,
  omitZeroMinute: 0,
  meridiem: 0,
  omitCommas: 0
};
const STANDARD_DATE_PROP_SEVERITIES = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
};
const MERIDIEM_RE = /\s*([ap])\.?m\.?/i; // eats up leading spaces too
const COMMA_RE = /,/g; // we need re for globalness
const MULTI_SPACE_RE = /\s+/g;
const LTR_RE = /\u200e/g; // control character
const UTC_RE = /UTC|GMT/;
class NativeFormatter {
  constructor(formatSettings) {
    let standardDateProps = {};
    let extendedSettings = {};
    let severity = 0;
    for (let name in formatSettings) {
      if (name in EXTENDED_SETTINGS_AND_SEVERITIES) {
        extendedSettings[name] = formatSettings[name];
        severity = Math.max(EXTENDED_SETTINGS_AND_SEVERITIES[name], severity);
      } else {
        standardDateProps[name] = formatSettings[name];
        if (name in STANDARD_DATE_PROP_SEVERITIES) {
          // TODO: what about hour12? no severity
          severity = Math.max(STANDARD_DATE_PROP_SEVERITIES[name], severity);
        }
      }
    }
    this.standardDateProps = standardDateProps;
    this.extendedSettings = extendedSettings;
    this.severity = severity;
    this.buildFormattingFunc = memoize(buildFormattingFunc);
  }
  format(date, context) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, context)(date);
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    let {
      standardDateProps,
      extendedSettings
    } = this;
    let diffSeverity = computeMarkerDiffSeverity(start.marker, end.marker, context.calendarSystem);
    if (!diffSeverity) {
      return this.format(start, context);
    }
    let biggestUnitForPartial = diffSeverity;
    if (biggestUnitForPartial > 1 && (
    // the two dates are different in a way that's larger scale than time
    standardDateProps.year === 'numeric' || standardDateProps.year === '2-digit') && (standardDateProps.month === 'numeric' || standardDateProps.month === '2-digit') && (standardDateProps.day === 'numeric' || standardDateProps.day === '2-digit')) {
      biggestUnitForPartial = 1; // make it look like the dates are only different in terms of time
    }
    let full0 = this.format(start, context);
    let full1 = this.format(end, context);
    if (full0 === full1) {
      return full0;
    }
    let partialDateProps = computePartialFormattingOptions(standardDateProps, biggestUnitForPartial);
    let partialFormattingFunc = buildFormattingFunc(partialDateProps, extendedSettings, context);
    let partial0 = partialFormattingFunc(start);
    let partial1 = partialFormattingFunc(end);
    let insertion = findCommonInsertion(full0, partial0, full1, partial1);
    let separator = extendedSettings.separator || betterDefaultSeparator || context.defaultSeparator || '';
    if (insertion) {
      return insertion.before + partial0 + separator + partial1 + insertion.after;
    }
    return full0 + separator + full1;
  }
  getLargestUnit() {
    switch (this.severity) {
      case 7:
      case 6:
      case 5:
        return 'year';
      case 4:
        return 'month';
      case 3:
        return 'week';
      case 2:
        return 'day';
      default:
        return 'time';
      // really?
    }
  }
}
function buildFormattingFunc(standardDateProps, extendedSettings, context) {
  let standardDatePropCnt = Object.keys(standardDateProps).length;
  if (standardDatePropCnt === 1 && standardDateProps.timeZoneName === 'short') {
    return date => formatTimeZoneOffset(date.timeZoneOffset);
  }
  if (standardDatePropCnt === 0 && extendedSettings.week) {
    return date => formatWeekNumber(context.computeWeekNumber(date.marker), context.weekText, context.weekTextLong, context.locale, extendedSettings.week);
  }
  return buildNativeFormattingFunc(standardDateProps, extendedSettings, context);
}
function buildNativeFormattingFunc(standardDateProps, extendedSettings, context) {
  standardDateProps = Object.assign({}, standardDateProps); // copy
  extendedSettings = Object.assign({}, extendedSettings); // copy
  sanitizeSettings(standardDateProps, extendedSettings);
  standardDateProps.timeZone = 'UTC'; // we leverage the only guaranteed timeZone for our UTC markers
  let normalFormat = new Intl.DateTimeFormat(context.locale.codes, standardDateProps);
  let zeroFormat; // needed?
  if (extendedSettings.omitZeroMinute) {
    let zeroProps = Object.assign({}, standardDateProps);
    delete zeroProps.minute; // seconds and ms were already considered in sanitizeSettings
    zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps);
  }
  return date => {
    let {
      marker
    } = date;
    let format;
    if (zeroFormat && !marker.getUTCMinutes()) {
      format = zeroFormat;
    } else {
      format = normalFormat;
    }
    let s = format.format(marker);
    return postProcess(s, date, standardDateProps, extendedSettings, context);
  };
}
function sanitizeSettings(standardDateProps, extendedSettings) {
  // deal with a browser inconsistency where formatting the timezone
  // requires that the hour/minute be present.
  if (standardDateProps.timeZoneName) {
    if (!standardDateProps.hour) {
      standardDateProps.hour = '2-digit';
    }
    if (!standardDateProps.minute) {
      standardDateProps.minute = '2-digit';
    }
  }
  // only support short timezone names
  if (standardDateProps.timeZoneName === 'long') {
    standardDateProps.timeZoneName = 'short';
  }
  // if requesting to display seconds, MUST display minutes
  if (extendedSettings.omitZeroMinute && (standardDateProps.second || standardDateProps.millisecond)) {
    delete extendedSettings.omitZeroMinute;
  }
}
function postProcess(s, date, standardDateProps, extendedSettings, context) {
  s = s.replace(LTR_RE, ''); // remove left-to-right control chars. do first. good for other regexes
  if (standardDateProps.timeZoneName === 'short') {
    s = injectTzoStr(s, context.timeZone === 'UTC' || date.timeZoneOffset == null ? 'UTC' :
    // important to normalize for IE, which does "GMT"
    formatTimeZoneOffset(date.timeZoneOffset));
  }
  if (extendedSettings.omitCommas) {
    s = s.replace(COMMA_RE, '').trim();
  }
  if (extendedSettings.omitZeroMinute) {
    s = s.replace(':00', ''); // zeroFormat doesn't always achieve this
  }
  // ^ do anything that might create adjacent spaces before this point,
  // because MERIDIEM_RE likes to eat up loading spaces
  if (extendedSettings.meridiem === false) {
    s = s.replace(MERIDIEM_RE, '').trim();
  } else if (extendedSettings.meridiem === 'narrow') {
    // a/p
    s = s.replace(MERIDIEM_RE, (m0, m1) => m1.toLocaleLowerCase());
  } else if (extendedSettings.meridiem === 'short') {
    // am/pm
    s = s.replace(MERIDIEM_RE, (m0, m1) => `${m1.toLocaleLowerCase()}m`);
  } else if (extendedSettings.meridiem === 'lowercase') {
    // other meridiem transformers already converted to lowercase
    s = s.replace(MERIDIEM_RE, m0 => m0.toLocaleLowerCase());
  }
  s = s.replace(MULTI_SPACE_RE, ' ');
  s = s.trim();
  return s;
}
function injectTzoStr(s, tzoStr) {
  let replaced = false;
  s = s.replace(UTC_RE, () => {
    replaced = true;
    return tzoStr;
  });
  // IE11 doesn't include UTC/GMT in the original string, so append to end
  if (!replaced) {
    s += ` ${tzoStr}`;
  }
  return s;
}
function formatWeekNumber(num, weekText, weekTextLong, locale, display) {
  let parts = [];
  if (display === 'long') {
    parts.push(weekTextLong);
  } else if (display === 'short' || display === 'narrow') {
    parts.push(weekText);
  }
  if (display === 'long' || display === 'short') {
    parts.push(' ');
  }
  parts.push(locale.simpleNumberFormat.format(num));
  if (locale.options.direction === 'rtl') {
    // TODO: use control characters instead?
    parts.reverse();
  }
  return parts.join('');
}
// Range Formatting Utils
// 0 = exactly the same
// 1 = different by time
// and bigger
function computeMarkerDiffSeverity(d0, d1, ca) {
  if (ca.getMarkerYear(d0) !== ca.getMarkerYear(d1)) {
    return 5;
  }
  if (ca.getMarkerMonth(d0) !== ca.getMarkerMonth(d1)) {
    return 4;
  }
  if (ca.getMarkerDay(d0) !== ca.getMarkerDay(d1)) {
    return 2;
  }
  if (timeAsMs(d0) !== timeAsMs(d1)) {
    return 1;
  }
  return 0;
}
function computePartialFormattingOptions(options, biggestUnit) {
  let partialOptions = {};
  for (let name in options) {
    if (!(name in STANDARD_DATE_PROP_SEVERITIES) ||
    // not a date part prop (like timeZone)
    STANDARD_DATE_PROP_SEVERITIES[name] <= biggestUnit) {
      partialOptions[name] = options[name];
    }
  }
  return partialOptions;
}
function findCommonInsertion(full0, partial0, full1, partial1) {
  let i0 = 0;
  while (i0 < full0.length) {
    let found0 = full0.indexOf(partial0, i0);
    if (found0 === -1) {
      break;
    }
    let before0 = full0.substr(0, found0);
    i0 = found0 + partial0.length;
    let after0 = full0.substr(i0);
    let i1 = 0;
    while (i1 < full1.length) {
      let found1 = full1.indexOf(partial1, i1);
      if (found1 === -1) {
        break;
      }
      let before1 = full1.substr(0, found1);
      i1 = found1 + partial1.length;
      let after1 = full1.substr(i1);
      if (before0 === before1 && after0 === after1) {
        return {
          before: before0,
          after: after0
        };
      }
    }
  }
  return null;
}
function expandZonedMarker(dateInfo, calendarSystem) {
  let a = calendarSystem.markerToArray(dateInfo.marker);
  return {
    marker: dateInfo.marker,
    timeZoneOffset: dateInfo.timeZoneOffset,
    array: a,
    year: a[0],
    month: a[1],
    day: a[2],
    hour: a[3],
    minute: a[4],
    second: a[5],
    millisecond: a[6]
  };
}
function createVerboseFormattingArg(start, end, context, betterDefaultSeparator) {
  let startInfo = expandZonedMarker(start, context.calendarSystem);
  let endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null;
  return {
    date: startInfo,
    start: startInfo,
    end: endInfo,
    timeZone: context.timeZone,
    localeCodes: context.locale.codes,
    defaultSeparator: betterDefaultSeparator || context.defaultSeparator
  };
}

/*
TODO: fix the terminology of "formatter" vs "formatting func"
*/
/*
At the time of instantiation, this object does not know which cmd-formatting system it will use.
It receives this at the time of formatting, as a setting.
*/
class CmdFormatter {
  constructor(cmdStr) {
    this.cmdStr = cmdStr;
  }
  format(date, context, betterDefaultSeparator) {
    return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
  }
}
class FuncFormatter {
  constructor(func) {
    this.func = func;
  }
  format(date, context, betterDefaultSeparator) {
    return this.func(createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    return this.func(createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
  }
}
function createFormatter(input) {
  if (typeof input === 'object' && input) {
    // non-null object
    return new NativeFormatter(input);
  }
  if (typeof input === 'string') {
    return new CmdFormatter(input);
  }
  if (typeof input === 'function') {
    return new FuncFormatter(input);
  }
  return null;
}

// base options
// ------------
const BASE_OPTION_REFINERS = {
  navLinkDayClick: identity,
  navLinkWeekClick: identity,
  duration: createDuration,
  bootstrapFontAwesome: identity,
  buttonIcons: identity,
  customButtons: identity,
  defaultAllDayEventDuration: createDuration,
  defaultTimedEventDuration: createDuration,
  nextDayThreshold: createDuration,
  scrollTime: createDuration,
  scrollTimeReset: Boolean,
  slotMinTime: createDuration,
  slotMaxTime: createDuration,
  dayPopoverFormat: createFormatter,
  slotDuration: createDuration,
  snapDuration: createDuration,
  headerToolbar: identity,
  footerToolbar: identity,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: createFormatter,
  dayHeaderClassNames: identity,
  dayHeaderContent: identity,
  dayHeaderDidMount: identity,
  dayHeaderWillUnmount: identity,
  dayCellClassNames: identity,
  dayCellContent: identity,
  dayCellDidMount: identity,
  dayCellWillUnmount: identity,
  initialView: String,
  aspectRatio: Number,
  weekends: Boolean,
  weekNumberCalculation: identity,
  weekNumbers: Boolean,
  weekNumberClassNames: identity,
  weekNumberContent: identity,
  weekNumberDidMount: identity,
  weekNumberWillUnmount: identity,
  editable: Boolean,
  viewClassNames: identity,
  viewDidMount: identity,
  viewWillUnmount: identity,
  nowIndicator: Boolean,
  nowIndicatorClassNames: identity,
  nowIndicatorContent: identity,
  nowIndicatorDidMount: identity,
  nowIndicatorWillUnmount: identity,
  showNonCurrentDates: Boolean,
  lazyFetching: Boolean,
  startParam: String,
  endParam: String,
  timeZoneParam: String,
  timeZone: String,
  locales: identity,
  locale: identity,
  themeSystem: String,
  dragRevertDuration: Number,
  dragScroll: Boolean,
  allDayMaintainDuration: Boolean,
  unselectAuto: Boolean,
  dropAccept: identity,
  eventOrder: parseFieldSpecs,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: identity,
  contentHeight: identity,
  direction: String,
  weekNumberFormat: createFormatter,
  eventResizableFromStart: Boolean,
  displayEventTime: Boolean,
  displayEventEnd: Boolean,
  weekText: String,
  weekTextLong: String,
  progressiveEventRendering: Boolean,
  businessHours: identity,
  initialDate: identity,
  now: identity,
  eventDataTransform: identity,
  stickyHeaderDates: identity,
  stickyFooterScrollbar: identity,
  viewHeight: identity,
  defaultAllDay: Boolean,
  eventSourceFailure: identity,
  eventSourceSuccess: identity,
  eventDisplay: String,
  eventStartEditable: Boolean,
  eventDurationEditable: Boolean,
  eventOverlap: identity,
  eventConstraint: identity,
  eventAllow: identity,
  eventBackgroundColor: String,
  eventBorderColor: String,
  eventTextColor: String,
  eventColor: String,
  eventClassNames: identity,
  eventContent: identity,
  eventDidMount: identity,
  eventWillUnmount: identity,
  selectConstraint: identity,
  selectOverlap: identity,
  selectAllow: identity,
  droppable: Boolean,
  unselectCancel: String,
  slotLabelFormat: identity,
  slotLaneClassNames: identity,
  slotLaneContent: identity,
  slotLaneDidMount: identity,
  slotLaneWillUnmount: identity,
  slotLabelClassNames: identity,
  slotLabelContent: identity,
  slotLabelDidMount: identity,
  slotLabelWillUnmount: identity,
  dayMaxEvents: identity,
  dayMaxEventRows: identity,
  dayMinWidth: Number,
  slotLabelInterval: createDuration,
  allDayText: String,
  allDayClassNames: identity,
  allDayContent: identity,
  allDayDidMount: identity,
  allDayWillUnmount: identity,
  slotMinWidth: Number,
  navLinks: Boolean,
  eventTimeFormat: createFormatter,
  rerenderDelay: Number,
  moreLinkText: identity,
  moreLinkHint: identity,
  selectMinDistance: Number,
  selectable: Boolean,
  selectLongPressDelay: Number,
  eventLongPressDelay: Number,
  selectMirror: Boolean,
  eventMaxStack: Number,
  eventMinHeight: Number,
  eventMinWidth: Number,
  eventShortHeight: Number,
  slotEventOverlap: Boolean,
  plugins: identity,
  firstDay: Number,
  dayCount: Number,
  dateAlignment: String,
  dateIncrement: createDuration,
  hiddenDays: identity,
  fixedWeekCount: Boolean,
  validRange: identity,
  visibleRange: identity,
  titleFormat: identity,
  eventInteractive: Boolean,
  // only used by list-view, but languages define the value, so we need it in base options
  noEventsText: String,
  viewHint: identity,
  navLinkHint: identity,
  closeHint: String,
  timeHint: String,
  eventHint: String,
  moreLinkClick: identity,
  moreLinkClassNames: identity,
  moreLinkContent: identity,
  moreLinkDidMount: identity,
  moreLinkWillUnmount: identity,
  monthStartFormat: createFormatter,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: identity,
  customRenderingMetaMap: identity,
  customRenderingReplaces: Boolean
};
// do NOT give a type here. need `typeof BASE_OPTION_DEFAULTS` to give real results.
// raw values.
const BASE_OPTION_DEFAULTS = {
  eventDisplay: 'auto',
  defaultRangeSeparator: ' - ',
  titleRangeSeparator: ' \u2013 ',
  defaultTimedEventDuration: '01:00:00',
  defaultAllDayEventDuration: {
    day: 1
  },
  forceEventDuration: false,
  nextDayThreshold: '00:00:00',
  dayHeaders: true,
  initialView: '',
  aspectRatio: 1.35,
  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next'
  },
  weekends: true,
  weekNumbers: false,
  weekNumberCalculation: 'local',
  editable: false,
  nowIndicator: false,
  scrollTime: '06:00:00',
  scrollTimeReset: true,
  slotMinTime: '00:00:00',
  slotMaxTime: '24:00:00',
  showNonCurrentDates: true,
  lazyFetching: true,
  startParam: 'start',
  endParam: 'end',
  timeZoneParam: 'timeZone',
  timeZone: 'local',
  locales: [],
  locale: '',
  themeSystem: 'standard',
  dragRevertDuration: 500,
  dragScroll: true,
  allDayMaintainDuration: false,
  unselectAuto: true,
  dropAccept: '*',
  eventOrder: 'start,-duration,allDay,title',
  dayPopoverFormat: {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  },
  handleWindowResize: true,
  windowResizeDelay: 100,
  longPressDelay: 1000,
  eventDragMinDistance: 5,
  expandRows: false,
  navLinks: false,
  selectable: false,
  eventMinHeight: 15,
  eventMinWidth: 30,
  eventShortHeight: 30,
  monthStartFormat: {
    month: 'long',
    day: 'numeric'
  }
};
// calendar listeners
// ------------------
const CALENDAR_LISTENER_REFINERS = {
  datesSet: identity,
  eventsSet: identity,
  eventAdd: identity,
  eventChange: identity,
  eventRemove: identity,
  windowResize: identity,
  eventClick: identity,
  eventMouseEnter: identity,
  eventMouseLeave: identity,
  select: identity,
  unselect: identity,
  loading: identity,
  // internal
  _unmount: identity,
  _beforeprint: identity,
  _afterprint: identity,
  _noEventDrop: identity,
  _noEventResize: identity,
  _resize: identity,
  _scrollRequest: identity
};
// calendar-specific options
// -------------------------
const CALENDAR_OPTION_REFINERS = {
  buttonText: identity,
  buttonHints: identity,
  views: identity,
  plugins: identity,
  initialEvents: identity,
  events: identity,
  eventSources: identity
};
const COMPLEX_OPTION_COMPARATORS = {
  headerToolbar: isMaybeObjectsEqual,
  footerToolbar: isMaybeObjectsEqual,
  buttonText: isMaybeObjectsEqual,
  buttonHints: isMaybeObjectsEqual,
  buttonIcons: isMaybeObjectsEqual,
  dateIncrement: isMaybeObjectsEqual,
  plugins: isMaybeArraysEqual,
  events: isMaybeArraysEqual,
  eventSources: isMaybeArraysEqual,
  ['resources']: isMaybeArraysEqual
};
function isMaybeObjectsEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object' && a && b) {
    // both non-null objects
    return isPropsEqual(a, b);
  }
  return a === b;
}
function isMaybeArraysEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isArraysEqual(a, b);
  }
  return a === b;
}
// view-specific options
// ---------------------
const VIEW_OPTION_REFINERS = {
  type: String,
  component: identity,
  buttonText: String,
  buttonTextKey: String,
  dateProfileGeneratorClass: identity,
  usesMinMaxTime: Boolean,
  classNames: identity,
  content: identity,
  didMount: identity,
  willUnmount: identity
};
// util funcs
// ----------------------------------------------------------------------------------------------------
function mergeRawOptions(optionSets) {
  return mergeProps(optionSets, COMPLEX_OPTION_COMPARATORS);
}
function refineProps(input, refiners) {
  let refined = {};
  let extra = {};
  for (let propName in refiners) {
    if (propName in input) {
      refined[propName] = refiners[propName](input[propName]);
    }
  }
  for (let propName in input) {
    if (!(propName in refiners)) {
      extra[propName] = input[propName];
    }
  }
  return {
    refined,
    extra
  };
}
function identity(raw) {
  return raw;
}
const {
  hasOwnProperty
} = Object.prototype;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexPropsMap) {
  let dest = {};
  if (complexPropsMap) {
    for (let name in complexPropsMap) {
      if (complexPropsMap[name] === isMaybeObjectsEqual) {
        // implies that it's object-mergeable
        let complexObjs = [];
        // collect the trailing object values, stopping when a non-object is discovered
        for (let i = propObjs.length - 1; i >= 0; i -= 1) {
          let val = propObjs[i][name];
          if (typeof val === 'object' && val) {
            // non-null object
            complexObjs.unshift(val);
          } else if (val !== undefined) {
            dest[name] = val; // if there were no objects, this value will be used
            break;
          }
        }
        // if the trailing values were objects, use the merged value
        if (complexObjs.length) {
          dest[name] = mergeProps(complexObjs);
        }
      }
    }
  }
  // copy values into the destination, going from last to first
  for (let i = propObjs.length - 1; i >= 0; i -= 1) {
    let props = propObjs[i];
    for (let name in props) {
      if (!(name in dest)) {
        // if already assigned by previous props or complex props, don't reassign
        dest[name] = props[name];
      }
    }
  }
  return dest;
}
function filterHash(hash, func) {
  let filtered = {};
  for (let key in hash) {
    if (func(hash[key], key)) {
      filtered[key] = hash[key];
    }
  }
  return filtered;
}
function mapHash(hash, func) {
  let newHash = {};
  for (let key in hash) {
    newHash[key] = func(hash[key], key);
  }
  return newHash;
}
function arrayToHash(a) {
  let hash = {};
  for (let item of a) {
    hash[item] = true;
  }
  return hash;
}
// TODO: reassess browser support
// https://caniuse.com/?search=object.values
function hashValuesToArray(obj) {
  let a = [];
  for (let key in obj) {
    a.push(obj[key]);
  }
  return a;
}
function isPropsEqual(obj0, obj1) {
  if (obj0 === obj1) {
    return true;
  }
  for (let key in obj0) {
    if (hasOwnProperty.call(obj0, key)) {
      if (!(key in obj1)) {
        return false;
      }
    }
  }
  for (let key in obj1) {
    if (hasOwnProperty.call(obj1, key)) {
      if (obj0[key] !== obj1[key]) {
        return false;
      }
    }
  }
  return true;
}
const HANDLER_RE = /^on[A-Z]/;
function isNonHandlerPropsEqual(obj0, obj1) {
  const keys = getUnequalProps(obj0, obj1);
  for (let key of keys) {
    if (!HANDLER_RE.test(key)) {
      return false;
    }
  }
  return true;
}
function getUnequalProps(obj0, obj1) {
  let keys = [];
  for (let key in obj0) {
    if (hasOwnProperty.call(obj0, key)) {
      if (!(key in obj1)) {
        keys.push(key);
      }
    }
  }
  for (let key in obj1) {
    if (hasOwnProperty.call(obj1, key)) {
      if (obj0[key] !== obj1[key]) {
        keys.push(key);
      }
    }
  }
  return keys;
}
function compareObjs(oldProps, newProps, equalityFuncs = {}) {
  if (oldProps === newProps) {
    return true;
  }
  for (let key in newProps) {
    if (key in oldProps && isObjValsEqual(oldProps[key], newProps[key], equalityFuncs[key])) ;else {
      return false;
    }
  }
  // check for props that were omitted in the new
  for (let key in oldProps) {
    if (!(key in newProps)) {
      return false;
    }
  }
  return true;
}
/*
assumed "true" equality for handler names like "onReceiveSomething"
*/
function isObjValsEqual(val0, val1, comparator) {
  if (val0 === val1 || comparator === true) {
    return true;
  }
  if (comparator) {
    return comparator(val0, val1);
  }
  return false;
}
function collectFromHash(hash, startIndex = 0, endIndex, step = 1) {
  let res = [];
  if (endIndex == null) {
    endIndex = Object.keys(hash).length;
  }
  for (let i = startIndex; i < endIndex; i += step) {
    let val = hash[i];
    if (val !== undefined) {
      // will disregard undefined for sparse arrays
      res.push(val);
    }
  }
  return res;
}
let calendarSystemClassMap = {};
function registerCalendarSystem(name, theClass) {
  calendarSystemClassMap[name] = theClass;
}
function createCalendarSystem(name) {
  return new calendarSystemClassMap[name]();
}
class GregorianCalendarSystem {
  getMarkerYear(d) {
    return d.getUTCFullYear();
  }
  getMarkerMonth(d) {
    return d.getUTCMonth();
  }
  getMarkerDay(d) {
    return d.getUTCDate();
  }
  arrayToMarker(arr) {
    return arrayToUtcDate(arr);
  }
  markerToArray(marker) {
    return dateToUtcArray(marker);
  }
}
registerCalendarSystem('gregory', GregorianCalendarSystem);
const ISO_RE = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function parse(str) {
  let m = ISO_RE.exec(str);
  if (m) {
    let marker = new Date(Date.UTC(Number(m[1]), m[3] ? Number(m[3]) - 1 : 0, Number(m[5] || 1), Number(m[7] || 0), Number(m[8] || 0), Number(m[10] || 0), m[12] ? Number(`0.${m[12]}`) * 1000 : 0));
    if (isValidDate(marker)) {
      let timeZoneOffset = null;
      if (m[13]) {
        timeZoneOffset = (m[15] === '-' ? -1 : 1) * (Number(m[16] || 0) * 60 + Number(m[18] || 0));
      }
      return {
        marker,
        isTimeUnspecified: !m[6],
        timeZoneOffset
      };
    }
  }
  return null;
}
class DateEnv {
  constructor(settings) {
    let timeZone = this.timeZone = settings.timeZone;
    let isNamedTimeZone = timeZone !== 'local' && timeZone !== 'UTC';
    if (settings.namedTimeZoneImpl && isNamedTimeZone) {
      this.namedTimeZoneImpl = new settings.namedTimeZoneImpl(timeZone);
    }
    this.canComputeOffset = Boolean(!isNamedTimeZone || this.namedTimeZoneImpl);
    this.calendarSystem = createCalendarSystem(settings.calendarSystem);
    this.locale = settings.locale;
    this.weekDow = settings.locale.week.dow;
    this.weekDoy = settings.locale.week.doy;
    if (settings.weekNumberCalculation === 'ISO') {
      this.weekDow = 1;
      this.weekDoy = 4;
    }
    if (typeof settings.firstDay === 'number') {
      this.weekDow = settings.firstDay;
    }
    if (typeof settings.weekNumberCalculation === 'function') {
      this.weekNumberFunc = settings.weekNumberCalculation;
    }
    this.weekText = settings.weekText != null ? settings.weekText : settings.locale.options.weekText;
    this.weekTextLong = (settings.weekTextLong != null ? settings.weekTextLong : settings.locale.options.weekTextLong) || this.weekText;
    this.cmdFormatter = settings.cmdFormatter;
    this.defaultSeparator = settings.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(input) {
    let meta = this.createMarkerMeta(input);
    if (meta === null) {
      return null;
    }
    return meta.marker;
  }
  createNowMarker() {
    if (this.canComputeOffset) {
      return this.timestampToMarker(new Date().valueOf());
    }
    // if we can't compute the current date val for a timezone,
    // better to give the current local date vals than UTC
    return arrayToUtcDate(dateToLocalArray(new Date()));
  }
  createMarkerMeta(input) {
    if (typeof input === 'string') {
      return this.parse(input);
    }
    let marker = null;
    if (typeof input === 'number') {
      marker = this.timestampToMarker(input);
    } else if (input instanceof Date) {
      input = input.valueOf();
      if (!isNaN(input)) {
        marker = this.timestampToMarker(input);
      }
    } else if (Array.isArray(input)) {
      marker = arrayToUtcDate(input);
    }
    if (marker === null || !isValidDate(marker)) {
      return null;
    }
    return {
      marker,
      isTimeUnspecified: false,
      forcedTzo: null
    };
  }
  parse(s) {
    let parts = parse(s);
    if (parts === null) {
      return null;
    }
    let {
      marker
    } = parts;
    let forcedTzo = null;
    if (parts.timeZoneOffset !== null) {
      if (this.canComputeOffset) {
        marker = this.timestampToMarker(marker.valueOf() - parts.timeZoneOffset * 60 * 1000);
      } else {
        forcedTzo = parts.timeZoneOffset;
      }
    }
    return {
      marker,
      isTimeUnspecified: parts.isTimeUnspecified,
      forcedTzo
    };
  }
  // Accessors
  getYear(marker) {
    return this.calendarSystem.getMarkerYear(marker);
  }
  getMonth(marker) {
    return this.calendarSystem.getMarkerMonth(marker);
  }
  getDay(marker) {
    return this.calendarSystem.getMarkerDay(marker);
  }
  // Adding / Subtracting
  add(marker, dur) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] += dur.years;
    a[1] += dur.months;
    a[2] += dur.days;
    a[6] += dur.milliseconds;
    return this.calendarSystem.arrayToMarker(a);
  }
  subtract(marker, dur) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] -= dur.years;
    a[1] -= dur.months;
    a[2] -= dur.days;
    a[6] -= dur.milliseconds;
    return this.calendarSystem.arrayToMarker(a);
  }
  addYears(marker, n) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] += n;
    return this.calendarSystem.arrayToMarker(a);
  }
  addMonths(marker, n) {
    let a = this.calendarSystem.markerToArray(marker);
    a[1] += n;
    return this.calendarSystem.arrayToMarker(a);
  }
  // Diffing Whole Units
  diffWholeYears(m0, m1) {
    let {
      calendarSystem
    } = this;
    if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) && calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)) {
      return calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0);
    }
    return null;
  }
  diffWholeMonths(m0, m1) {
    let {
      calendarSystem
    } = this;
    if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)) {
      return calendarSystem.getMarkerMonth(m1) - calendarSystem.getMarkerMonth(m0) + (calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)) * 12;
    }
    return null;
  }
  // Range / Duration
  greatestWholeUnit(m0, m1) {
    let n = this.diffWholeYears(m0, m1);
    if (n !== null) {
      return {
        unit: 'year',
        value: n
      };
    }
    n = this.diffWholeMonths(m0, m1);
    if (n !== null) {
      return {
        unit: 'month',
        value: n
      };
    }
    n = diffWholeWeeks(m0, m1);
    if (n !== null) {
      return {
        unit: 'week',
        value: n
      };
    }
    n = diffWholeDays(m0, m1);
    if (n !== null) {
      return {
        unit: 'day',
        value: n
      };
    }
    n = diffHours(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'hour',
        value: n
      };
    }
    n = diffMinutes(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'minute',
        value: n
      };
    }
    n = diffSeconds(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'second',
        value: n
      };
    }
    return {
      unit: 'millisecond',
      value: m1.valueOf() - m0.valueOf()
    };
  }
  countDurationsBetween(m0, m1, d) {
    // TODO: can use greatestWholeUnit
    let diff;
    if (d.years) {
      diff = this.diffWholeYears(m0, m1);
      if (diff !== null) {
        return diff / asRoughYears(d);
      }
    }
    if (d.months) {
      diff = this.diffWholeMonths(m0, m1);
      if (diff !== null) {
        return diff / asRoughMonths(d);
      }
    }
    if (d.days) {
      diff = diffWholeDays(m0, m1);
      if (diff !== null) {
        return diff / asRoughDays(d);
      }
    }
    return (m1.valueOf() - m0.valueOf()) / asRoughMs(d);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(m, unit) {
    if (unit === 'year') {
      return this.startOfYear(m);
    }
    if (unit === 'month') {
      return this.startOfMonth(m);
    }
    if (unit === 'week') {
      return this.startOfWeek(m);
    }
    if (unit === 'day') {
      return startOfDay(m);
    }
    if (unit === 'hour') {
      return startOfHour(m);
    }
    if (unit === 'minute') {
      return startOfMinute(m);
    }
    if (unit === 'second') {
      return startOfSecond(m);
    }
    return null;
  }
  startOfYear(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m)]);
  }
  startOfMonth(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m), this.calendarSystem.getMarkerMonth(m)]);
  }
  startOfWeek(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m), this.calendarSystem.getMarkerMonth(m), m.getUTCDate() - (m.getUTCDay() - this.weekDow + 7) % 7]);
  }
  // Week Number
  computeWeekNumber(marker) {
    if (this.weekNumberFunc) {
      return this.weekNumberFunc(this.toDate(marker));
    }
    return weekOfYear(marker, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(marker, formatter, dateOptions = {}) {
    return formatter.format({
      marker,
      timeZoneOffset: dateOptions.forcedTzo != null ? dateOptions.forcedTzo : this.offsetForMarker(marker)
    }, this);
  }
  formatRange(start, end, formatter, dateOptions = {}) {
    if (dateOptions.isEndExclusive) {
      end = addMs(end, -1);
    }
    return formatter.formatRange({
      marker: start,
      timeZoneOffset: dateOptions.forcedStartTzo != null ? dateOptions.forcedStartTzo : this.offsetForMarker(start)
    }, {
      marker: end,
      timeZoneOffset: dateOptions.forcedEndTzo != null ? dateOptions.forcedEndTzo : this.offsetForMarker(end)
    }, this, dateOptions.defaultSeparator);
  }
  /*
  DUMB: the omitTime arg is dumb. if we omit the time, we want to omit the timezone offset. and if we do that,
  might as well use buildIsoString or some other util directly
  */
  formatIso(marker, extraOptions = {}) {
    let timeZoneOffset = null;
    if (!extraOptions.omitTimeZoneOffset) {
      if (extraOptions.forcedTzo != null) {
        timeZoneOffset = extraOptions.forcedTzo;
      } else {
        timeZoneOffset = this.offsetForMarker(marker);
      }
    }
    return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime);
  }
  // TimeZone
  timestampToMarker(ms) {
    if (this.timeZone === 'local') {
      return arrayToUtcDate(dateToLocalArray(new Date(ms)));
    }
    if (this.timeZone === 'UTC' || !this.namedTimeZoneImpl) {
      return new Date(ms);
    }
    return arrayToUtcDate(this.namedTimeZoneImpl.timestampToArray(ms));
  }
  offsetForMarker(m) {
    if (this.timeZone === 'local') {
      return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset(); // convert "inverse" offset to "normal" offset
    }
    if (this.timeZone === 'UTC') {
      return 0;
    }
    if (this.namedTimeZoneImpl) {
      return this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m));
    }
    return null;
  }
  // Conversion
  toDate(m, forcedTzo) {
    if (this.timeZone === 'local') {
      return arrayToLocalDate(dateToUtcArray(m));
    }
    if (this.timeZone === 'UTC') {
      return new Date(m.valueOf()); // make sure it's a copy
    }
    if (!this.namedTimeZoneImpl) {
      return new Date(m.valueOf() - (forcedTzo || 0));
    }
    return new Date(m.valueOf() - this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m)) * 1000 * 60);
  }
}
class Theme {
  constructor(calendarOptions) {
    if (this.iconOverrideOption) {
      this.setIconOverride(calendarOptions[this.iconOverrideOption]);
    }
  }
  setIconOverride(iconOverrideHash) {
    let iconClassesCopy;
    let buttonName;
    if (typeof iconOverrideHash === 'object' && iconOverrideHash) {
      // non-null object
      iconClassesCopy = Object.assign({}, this.iconClasses);
      for (buttonName in iconOverrideHash) {
        iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName]);
      }
      this.iconClasses = iconClassesCopy;
    } else if (iconOverrideHash === false) {
      this.iconClasses = {};
    }
  }
  applyIconOverridePrefix(className) {
    let prefix = this.iconOverridePrefix;
    if (prefix && className.indexOf(prefix) !== 0) {
      // if not already present
      className = prefix + className;
    }
    return className;
  }
  getClass(key) {
    return this.classes[key] || '';
  }
  getIconClass(buttonName, isRtl) {
    let className;
    if (isRtl && this.rtlIconClasses) {
      className = this.rtlIconClasses[buttonName] || this.iconClasses[buttonName];
    } else {
      className = this.iconClasses[buttonName];
    }
    if (className) {
      return `${this.baseIconClass} ${className}`;
    }
    return '';
  }
  getCustomButtonIconClass(customButtonProps) {
    let className;
    if (this.iconOverrideCustomButtonOption) {
      className = customButtonProps[this.iconOverrideCustomButtonOption];
      if (className) {
        return `${this.baseIconClass} ${this.applyIconOverridePrefix(className)}`;
      }
    }
    return '';
  }
}
Theme.prototype.classes = {};
Theme.prototype.iconClasses = {};
Theme.prototype.baseIconClass = '';
Theme.prototype.iconOverridePrefix = '';

/*
NOTE: this can be a public API, especially createElement for hooks.
See examples/typescript-scheduler/src/index.ts
*/
function flushSync(runBeforeFlush) {
  runBeforeFlush();
  let oldDebounceRendering = preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering; // orig
  let callbackQ = [];
  function execCallbackSync(callback) {
    callbackQ.push(callback);
  }
  preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering = execCallbackSync;
  preact__WEBPACK_IMPORTED_MODULE_0__.render(preact__WEBPACK_IMPORTED_MODULE_0__.createElement(FakeComponent, {}), document.createElement('div'));
  while (callbackQ.length) {
    callbackQ.shift()();
  }
  preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering = oldDebounceRendering;
}
class FakeComponent extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {});
  }
  componentDidMount() {
    this.setState({});
  }
}
// TODO: use preact/compat instead?
function createContext(defaultValue) {
  let ContextType = preact__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultValue);
  let origProvider = ContextType.Provider;
  ContextType.Provider = function () {
    let isNew = !this.getChildContext;
    let children = origProvider.apply(this, arguments); // eslint-disable-line prefer-rest-params
    if (isNew) {
      let subs = [];
      this.shouldComponentUpdate = _props => {
        if (this.props.value !== _props.value) {
          subs.forEach(c => {
            c.context = _props.value;
            c.forceUpdate();
          });
        }
      };
      this.sub = c => {
        subs.push(c);
        let old = c.componentWillUnmount;
        c.componentWillUnmount = () => {
          subs.splice(subs.indexOf(c), 1);
          old && old.call(c);
        };
      };
    }
    return children;
  };
  return ContextType;
}
class ScrollResponder {
  constructor(execFunc, emitter, scrollTime, scrollTimeReset) {
    this.execFunc = execFunc;
    this.emitter = emitter;
    this.scrollTime = scrollTime;
    this.scrollTimeReset = scrollTimeReset;
    this.handleScrollRequest = request => {
      this.queuedRequest = Object.assign({}, this.queuedRequest || {}, request);
      this.drain();
    };
    emitter.on('_scrollRequest', this.handleScrollRequest);
    this.fireInitialScroll();
  }
  detach() {
    this.emitter.off('_scrollRequest', this.handleScrollRequest);
  }
  update(isDatesNew) {
    if (isDatesNew && this.scrollTimeReset) {
      this.fireInitialScroll(); // will drain
    } else {
      this.drain();
    }
  }
  fireInitialScroll() {
    this.handleScrollRequest({
      time: this.scrollTime
    });
  }
  drain() {
    if (this.queuedRequest && this.execFunc(this.queuedRequest)) {
      this.queuedRequest = null;
    }
  }
}
const ViewContextType = createContext({}); // for Components
function buildViewContext(viewSpec, viewApi, viewOptions, dateProfileGenerator, dateEnv, theme, pluginHooks, dispatch, getCurrentData, emitter, calendarApi, registerInteractiveComponent, unregisterInteractiveComponent) {
  return {
    dateEnv,
    options: viewOptions,
    pluginHooks,
    emitter,
    dispatch,
    getCurrentData,
    calendarApi,
    viewSpec,
    viewApi,
    dateProfileGenerator,
    theme,
    isRtl: viewOptions.direction === 'rtl',
    addResizeHandler(handler) {
      emitter.on('_resize', handler);
    },
    removeResizeHandler(handler) {
      emitter.off('_resize', handler);
    },
    createScrollResponder(execFunc) {
      return new ScrollResponder(execFunc, emitter, createDuration(viewOptions.scrollTime), viewOptions.scrollTimeReset);
    },
    registerInteractiveComponent,
    unregisterInteractiveComponent
  };
}

/* eslint max-classes-per-file: off */
class PureComponent extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(getUnequalProps(nextProps, this.props), getUnequalProps(nextState, this.state));
    }
    return !compareObjs(this.props, nextProps, this.propEquality) || !compareObjs(this.state, nextState, this.stateEquality);
  }
  // HACK for freakin' React StrictMode
  safeSetState(newState) {
    if (!compareObjs(this.state, Object.assign(Object.assign({}, this.state), newState), this.stateEquality)) {
      this.setState(newState);
    }
  }
}
PureComponent.addPropsEquality = addPropsEquality;
PureComponent.addStateEquality = addStateEquality;
PureComponent.contextType = ViewContextType;
PureComponent.prototype.propEquality = {};
PureComponent.prototype.stateEquality = {};
class BaseComponent extends PureComponent {}
BaseComponent.contextType = ViewContextType;
function addPropsEquality(propEquality) {
  let hash = Object.create(this.prototype.propEquality);
  Object.assign(hash, propEquality);
  this.prototype.propEquality = hash;
}
function addStateEquality(stateEquality) {
  let hash = Object.create(this.prototype.stateEquality);
  Object.assign(hash, stateEquality);
  this.prototype.stateEquality = hash;
}
// use other one
function setRef(ref, current) {
  if (typeof ref === 'function') {
    ref(current);
  } else if (ref) {
    // see https://github.com/facebook/react/issues/13029
    ref.current = current;
  }
}
class ContentInjector extends BaseComponent {
  constructor() {
    super(...arguments);
    this.id = guid();
    this.queuedDomNodes = [];
    this.currentDomNodes = [];
    this.handleEl = el => {
      const {
        options
      } = this.context;
      const {
        generatorName
      } = this.props;
      if (!options.customRenderingReplaces || !hasCustomRenderingHandler(generatorName, options)) {
        this.updateElRef(el);
      }
    };
    this.updateElRef = el => {
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
      }
    };
  }
  render() {
    const {
      props,
      context
    } = this;
    const {
      options
    } = context;
    const {
      customGenerator,
      defaultGenerator,
      renderProps
    } = props;
    const attrs = buildElAttrs(props, [], this.handleEl);
    let useDefault = false;
    let innerContent;
    let queuedDomNodes = [];
    let currentGeneratorMeta;
    if (customGenerator != null) {
      const customGeneratorRes = typeof customGenerator === 'function' ? customGenerator(renderProps, preact__WEBPACK_IMPORTED_MODULE_0__.createElement) : customGenerator;
      if (customGeneratorRes === true) {
        useDefault = true;
      } else {
        const isObject = customGeneratorRes && typeof customGeneratorRes === 'object'; // non-null
        if (isObject && 'html' in customGeneratorRes) {
          attrs.dangerouslySetInnerHTML = {
            __html: customGeneratorRes.html
          };
        } else if (isObject && 'domNodes' in customGeneratorRes) {
          queuedDomNodes = Array.prototype.slice.call(customGeneratorRes.domNodes);
        } else if (isObject ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(customGeneratorRes) // vdom node
        : typeof customGeneratorRes !== 'function' // primitive value (like string or number)
        ) {
          // use in vdom
          innerContent = customGeneratorRes;
        } else {
          // an exotic object for handleCustomRendering
          currentGeneratorMeta = customGeneratorRes;
        }
      }
    } else {
      useDefault = !hasCustomRenderingHandler(props.generatorName, options);
    }
    if (useDefault && defaultGenerator) {
      innerContent = defaultGenerator(renderProps);
    }
    this.queuedDomNodes = queuedDomNodes;
    this.currentGeneratorMeta = currentGeneratorMeta;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.elTag, attrs, innerContent);
  }
  componentDidMount() {
    this.applyQueueudDomNodes();
    this.triggerCustomRendering(true);
  }
  componentDidUpdate() {
    this.applyQueueudDomNodes();
    this.triggerCustomRendering(true);
  }
  componentWillUnmount() {
    this.triggerCustomRendering(false); // TODO: different API for removal?
  }
  triggerCustomRendering(isActive) {
    var _a;
    const {
      props,
      context
    } = this;
    const {
      handleCustomRendering,
      customRenderingMetaMap
    } = context.options;
    if (handleCustomRendering) {
      const generatorMeta = (_a = this.currentGeneratorMeta) !== null && _a !== void 0 ? _a : customRenderingMetaMap === null || customRenderingMetaMap === void 0 ? void 0 : customRenderingMetaMap[props.generatorName];
      if (generatorMeta) {
        handleCustomRendering(Object.assign(Object.assign({
          id: this.id,
          isActive,
          containerEl: this.base,
          reportNewContainerEl: this.updateElRef,
          // front-end framework tells us about new container els
          generatorMeta
        }, props), {
          elClasses: (props.elClasses || []).filter(isTruthy)
        }));
      }
    }
  }
  applyQueueudDomNodes() {
    const {
      queuedDomNodes,
      currentDomNodes
    } = this;
    const el = this.base;
    if (!isArraysEqual(queuedDomNodes, currentDomNodes)) {
      currentDomNodes.forEach(removeElement);
      for (let newNode of queuedDomNodes) {
        el.appendChild(newNode);
      }
      this.currentDomNodes = queuedDomNodes;
    }
  }
}
ContentInjector.addPropsEquality({
  elClasses: isArraysEqual,
  elStyle: isPropsEqual,
  elAttrs: isNonHandlerPropsEqual,
  renderProps: isPropsEqual
});
// Util
/*
Does UI-framework provide custom way of rendering that does not use Preact VDOM
AND does the calendar's options define custom rendering?
AKA. Should we NOT render the default content?
*/
function hasCustomRenderingHandler(generatorName, options) {
  var _a;
  return Boolean(options.handleCustomRendering && generatorName && ((_a = options.customRenderingMetaMap) === null || _a === void 0 ? void 0 : _a[generatorName]));
}
function buildElAttrs(props, extraClassNames, elRef) {
  const attrs = Object.assign(Object.assign({}, props.elAttrs), {
    ref: elRef
  });
  if (props.elClasses || extraClassNames) {
    attrs.className = (props.elClasses || []).concat(extraClassNames || []).concat(attrs.className || []).filter(Boolean).join(' ');
  }
  if (props.elStyle) {
    attrs.style = props.elStyle;
  }
  return attrs;
}
function isTruthy(val) {
  return Boolean(val);
}
const RenderId = createContext(0);
class ContentContainer extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.InnerContent = InnerContentInjector.bind(undefined, this);
    this.handleEl = el => {
      this.el = el;
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
        if (el && this.didMountMisfire) {
          this.componentDidMount();
        }
      }
    };
  }
  render() {
    const {
      props
    } = this;
    const generatedClassNames = generateClassNames(props.classNameGenerator, props.renderProps);
    if (props.children) {
      const elAttrs = buildElAttrs(props, generatedClassNames, this.handleEl);
      const children = props.children(this.InnerContent, props.renderProps, elAttrs);
      if (props.elTag) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.elTag, elAttrs, children);
      } else {
        return children;
      }
    } else {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentInjector, Object.assign(Object.assign({}, props), {
        elRef: this.handleEl,
        elTag: props.elTag || 'div',
        elClasses: (props.elClasses || []).concat(generatedClassNames),
        renderId: this.context
      }));
    }
  }
  componentDidMount() {
    var _a, _b;
    if (this.el) {
      (_b = (_a = this.props).didMount) === null || _b === void 0 ? void 0 : _b.call(_a, Object.assign(Object.assign({}, this.props.renderProps), {
        el: this.el
      }));
    } else {
      this.didMountMisfire = true;
    }
  }
  componentWillUnmount() {
    var _a, _b;
    (_b = (_a = this.props).willUnmount) === null || _b === void 0 ? void 0 : _b.call(_a, Object.assign(Object.assign({}, this.props.renderProps), {
      el: this.el
    }));
  }
}
ContentContainer.contextType = RenderId;
function InnerContentInjector(containerComponent, props) {
  const parentProps = containerComponent.props;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentInjector, Object.assign({
    renderProps: parentProps.renderProps,
    generatorName: parentProps.generatorName,
    customGenerator: parentProps.customGenerator,
    defaultGenerator: parentProps.defaultGenerator,
    renderId: containerComponent.context
  }, props));
}
// Utils
function generateClassNames(classNameGenerator, renderProps) {
  const classNames = typeof classNameGenerator === 'function' ? classNameGenerator(renderProps) : classNameGenerator || [];
  return typeof classNames === 'string' ? [classNames] : classNames;
}
class ViewContainer extends BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let renderProps = {
      view: context.viewApi
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props, {
      elTag: props.elTag || 'div',
      elClasses: [...buildViewClassNames(props.viewSpec), ...(props.elClasses || [])],
      renderProps: renderProps,
      classNameGenerator: options.viewClassNames,
      generatorName: undefined,
      didMount: options.viewDidMount,
      willUnmount: options.viewWillUnmount
    }), () => props.children);
  }
}
function buildViewClassNames(viewSpec) {
  return [`fc-${viewSpec.type}-view`, 'fc-view'];
}
function parseRange(input, dateEnv) {
  let start = null;
  let end = null;
  if (input.start) {
    start = dateEnv.createMarker(input.start);
  }
  if (input.end) {
    end = dateEnv.createMarker(input.end);
  }
  if (!start && !end) {
    return null;
  }
  if (start && end && end < start) {
    return null;
  }
  return {
    start,
    end
  };
}
// SIDE-EFFECT: will mutate ranges.
// Will return a new array result.
function invertRanges(ranges, constraintRange) {
  let invertedRanges = [];
  let {
    start
  } = constraintRange; // the end of the previous range. the start of the new range
  let i;
  let dateRange;
  // ranges need to be in order. required for our date-walking algorithm
  ranges.sort(compareRanges);
  for (i = 0; i < ranges.length; i += 1) {
    dateRange = ranges[i];
    // add the span of time before the event (if there is any)
    if (dateRange.start > start) {
      // compare millisecond time (skip any ambig logic)
      invertedRanges.push({
        start,
        end: dateRange.start
      });
    }
    if (dateRange.end > start) {
      start = dateRange.end;
    }
  }
  // add the span of time after the last event (if there is any)
  if (start < constraintRange.end) {
    // compare millisecond time (skip any ambig logic)
    invertedRanges.push({
      start,
      end: constraintRange.end
    });
  }
  return invertedRanges;
}
function compareRanges(range0, range1) {
  return range0.start.valueOf() - range1.start.valueOf(); // earlier ranges go first
}
function intersectRanges(range0, range1) {
  let {
    start,
    end
  } = range0;
  let newRange = null;
  if (range1.start !== null) {
    if (start === null) {
      start = range1.start;
    } else {
      start = new Date(Math.max(start.valueOf(), range1.start.valueOf()));
    }
  }
  if (range1.end != null) {
    if (end === null) {
      end = range1.end;
    } else {
      end = new Date(Math.min(end.valueOf(), range1.end.valueOf()));
    }
  }
  if (start === null || end === null || start < end) {
    newRange = {
      start,
      end
    };
  }
  return newRange;
}
function rangesEqual(range0, range1) {
  return (range0.start === null ? null : range0.start.valueOf()) === (range1.start === null ? null : range1.start.valueOf()) && (range0.end === null ? null : range0.end.valueOf()) === (range1.end === null ? null : range1.end.valueOf());
}
function rangesIntersect(range0, range1) {
  return (range0.end === null || range1.start === null || range0.end > range1.start) && (range0.start === null || range1.end === null || range0.start < range1.end);
}
function rangeContainsRange(outerRange, innerRange) {
  return (outerRange.start === null || innerRange.start !== null && innerRange.start >= outerRange.start) && (outerRange.end === null || innerRange.end !== null && innerRange.end <= outerRange.end);
}
function rangeContainsMarker(range, date) {
  return (range.start === null || date >= range.start) && (range.end === null || date < range.end);
}
// If the given date is not within the given range, move it inside.
// (If it's past the end, make it one millisecond before the end).
function constrainMarkerToRange(date, range) {
  if (range.start != null && date < range.start) {
    return range.start;
  }
  if (range.end != null && date >= range.end) {
    return new Date(range.end.valueOf() - 1);
  }
  return date;
}

/* Date stuff that doesn't belong in datelib core
----------------------------------------------------------------------------------------------------------------------*/
// given a timed range, computes an all-day range that has the same exact duration,
// but whose start time is aligned with the start of the day.
function computeAlignedDayRange(timedRange) {
  let dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1;
  let start = startOfDay(timedRange.start);
  let end = addDays(start, dayCnt);
  return {
    start,
    end
  };
}
// given a timed range, computes an all-day range based on how for the end date bleeds into the next day
// TODO: give nextDayThreshold a default arg
function computeVisibleDayRange(timedRange, nextDayThreshold = createDuration(0)) {
  let startDay = null;
  let endDay = null;
  if (timedRange.end) {
    endDay = startOfDay(timedRange.end);
    let endTimeMS = timedRange.end.valueOf() - endDay.valueOf(); // # of milliseconds into `endDay`
    // If the end time is actually inclusively part of the next day and is equal to or
    // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
    // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
    if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) {
      endDay = addDays(endDay, 1);
    }
  }
  if (timedRange.start) {
    startDay = startOfDay(timedRange.start); // the beginning of the day the range starts
    // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
    if (endDay && endDay <= startDay) {
      endDay = addDays(startDay, 1);
    }
  }
  return {
    start: startDay,
    end: endDay
  };
}
// spans from one day into another?
function isMultiDayRange(range) {
  let visibleRange = computeVisibleDayRange(range);
  return diffDays(visibleRange.start, visibleRange.end) > 1;
}
function diffDates(date0, date1, dateEnv, largeUnit) {
  if (largeUnit === 'year') {
    return createDuration(dateEnv.diffWholeYears(date0, date1), 'year');
  }
  if (largeUnit === 'month') {
    return createDuration(dateEnv.diffWholeMonths(date0, date1), 'month');
  }
  return diffDayAndTime(date0, date1); // returns a duration
}
function reduceCurrentDate(currentDate, action) {
  switch (action.type) {
    case 'CHANGE_DATE':
      return action.dateMarker;
    default:
      return currentDate;
  }
}
function getInitialDate(options, dateEnv) {
  let initialDateInput = options.initialDate;
  // compute the initial ambig-timezone date
  if (initialDateInput != null) {
    return dateEnv.createMarker(initialDateInput);
  }
  return getNow(options.now, dateEnv); // getNow already returns unzoned
}
function getNow(nowInput, dateEnv) {
  if (typeof nowInput === 'function') {
    nowInput = nowInput();
  }
  if (nowInput == null) {
    return dateEnv.createNowMarker();
  }
  return dateEnv.createMarker(nowInput);
}
class DateProfileGenerator {
  constructor(props) {
    this.props = props;
    this.nowDate = getNow(props.nowInput, props.dateEnv);
    this.initHiddenDays();
  }
  /* Date Range Computation
  ------------------------------------------------------------------------------------------------------------------*/
  // Builds a structure with info about what the dates/ranges will be for the "prev" view.
  buildPrev(currentDateProfile, currentDate, forceToValid) {
    let {
      dateEnv
    } = this.props;
    let prevDate = dateEnv.subtract(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit),
    // important for start-of-month
    currentDateProfile.dateIncrement);
    return this.build(prevDate, -1, forceToValid);
  }
  // Builds a structure with info about what the dates/ranges will be for the "next" view.
  buildNext(currentDateProfile, currentDate, forceToValid) {
    let {
      dateEnv
    } = this.props;
    let nextDate = dateEnv.add(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit),
    // important for start-of-month
    currentDateProfile.dateIncrement);
    return this.build(nextDate, 1, forceToValid);
  }
  // Builds a structure holding dates/ranges for rendering around the given date.
  // Optional direction param indicates whether the date is being incremented/decremented
  // from its previous value. decremented = -1, incremented = 1 (default).
  build(currentDate, direction, forceToValid = true) {
    let {
      props
    } = this;
    let validRange;
    let currentInfo;
    let isRangeAllDay;
    let renderRange;
    let activeRange;
    let isValid;
    validRange = this.buildValidRange();
    validRange = this.trimHiddenDays(validRange);
    if (forceToValid) {
      currentDate = constrainMarkerToRange(currentDate, validRange);
    }
    currentInfo = this.buildCurrentRangeInfo(currentDate, direction);
    isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
    renderRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.range), currentInfo.unit, isRangeAllDay);
    renderRange = this.trimHiddenDays(renderRange);
    activeRange = renderRange;
    if (!props.showNonCurrentDates) {
      activeRange = intersectRanges(activeRange, currentInfo.range);
    }
    activeRange = this.adjustActiveRange(activeRange);
    activeRange = intersectRanges(activeRange, validRange); // might return null
    // it's invalid if the originally requested date is not contained,
    // or if the range is completely outside of the valid range.
    isValid = rangesIntersect(currentInfo.range, validRange);
    // HACK: constrain to render-range so `currentDate` is more useful to view rendering
    if (!rangeContainsMarker(renderRange, currentDate)) {
      currentDate = renderRange.start;
    }
    return {
      currentDate,
      // constraint for where prev/next operations can go and where events can be dragged/resized to.
      // an object with optional start and end properties.
      validRange,
      // range the view is formally responsible for.
      // for example, a month view might have 1st-31st, excluding padded dates
      currentRange: currentInfo.range,
      // name of largest unit being displayed, like "month" or "week"
      currentRangeUnit: currentInfo.unit,
      isRangeAllDay,
      // dates that display events and accept drag-n-drop
      // will be `null` if no dates accept events
      activeRange,
      // date range with a rendered skeleton
      // includes not-active days that need some sort of DOM
      renderRange,
      // Duration object that denotes the first visible time of any given day
      slotMinTime: props.slotMinTime,
      // Duration object that denotes the exclusive visible end time of any given day
      slotMaxTime: props.slotMaxTime,
      isValid,
      // how far the current date will move for a prev/next operation
      dateIncrement: this.buildDateIncrement(currentInfo.duration)
      // pass a fallback (might be null) ^
    };
  }
  // Builds an object with optional start/end properties.
  // Indicates the minimum/maximum dates to display.
  // not responsible for trimming hidden days.
  buildValidRange() {
    let input = this.props.validRangeInput;
    let simpleInput = typeof input === 'function' ? input.call(this.props.calendarApi, this.nowDate) : input;
    return this.refineRange(simpleInput) || {
      start: null,
      end: null
    }; // completely open-ended
  }
  // Builds a structure with info about the "current" range, the range that is
  // highlighted as being the current month for example.
  // See build() for a description of `direction`.
  // Guaranteed to have `range` and `unit` properties. `duration` is optional.
  buildCurrentRangeInfo(date, direction) {
    let {
      props
    } = this;
    let duration = null;
    let unit = null;
    let range = null;
    let dayCount;
    if (props.duration) {
      duration = props.duration;
      unit = props.durationUnit;
      range = this.buildRangeFromDuration(date, direction, duration, unit);
    } else if (dayCount = this.props.dayCount) {
      unit = 'day';
      range = this.buildRangeFromDayCount(date, direction, dayCount);
    } else if (range = this.buildCustomVisibleRange(date)) {
      unit = props.dateEnv.greatestWholeUnit(range.start, range.end).unit;
    } else {
      duration = this.getFallbackDuration();
      unit = greatestDurationDenominator(duration).unit;
      range = this.buildRangeFromDuration(date, direction, duration, unit);
    }
    return {
      duration,
      unit,
      range
    };
  }
  getFallbackDuration() {
    return createDuration({
      day: 1
    });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(range) {
    let {
      dateEnv,
      usesMinMaxTime,
      slotMinTime,
      slotMaxTime
    } = this.props;
    let {
      start,
      end
    } = range;
    if (usesMinMaxTime) {
      // expand active range if slotMinTime is negative (why not when positive?)
      if (asRoughDays(slotMinTime) < 0) {
        start = startOfDay(start); // necessary?
        start = dateEnv.add(start, slotMinTime);
      }
      // expand active range if slotMaxTime is beyond one day (why not when negative?)
      if (asRoughDays(slotMaxTime) > 1) {
        end = startOfDay(end); // necessary?
        end = addDays(end, -1);
        end = dateEnv.add(end, slotMaxTime);
      }
    }
    return {
      start,
      end
    };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(date, direction, duration, unit) {
    let {
      dateEnv,
      dateAlignment
    } = this.props;
    let start;
    let end;
    let res;
    // compute what the alignment should be
    if (!dateAlignment) {
      let {
        dateIncrement
      } = this.props;
      if (dateIncrement) {
        // use the smaller of the two units
        if (asRoughMs(dateIncrement) < asRoughMs(duration)) {
          dateAlignment = greatestDurationDenominator(dateIncrement).unit;
        } else {
          dateAlignment = unit;
        }
      } else {
        dateAlignment = unit;
      }
    }
    // if the view displays a single day or smaller
    if (asRoughDays(duration) <= 1) {
      if (this.isHiddenDay(start)) {
        start = this.skipHiddenDays(start, direction);
        start = startOfDay(start);
      }
    }
    function computeRes() {
      start = dateEnv.startOf(date, dateAlignment);
      end = dateEnv.add(start, duration);
      res = {
        start,
        end
      };
    }
    computeRes();
    // if range is completely enveloped by hidden days, go past the hidden days
    if (!this.trimHiddenDays(res)) {
      date = this.skipHiddenDays(date, direction);
      computeRes();
    }
    return res;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(date, direction, dayCount) {
    let {
      dateEnv,
      dateAlignment
    } = this.props;
    let runningCount = 0;
    let start = date;
    let end;
    if (dateAlignment) {
      start = dateEnv.startOf(start, dateAlignment);
    }
    start = startOfDay(start);
    start = this.skipHiddenDays(start, direction);
    end = start;
    do {
      end = addDays(end, 1);
      if (!this.isHiddenDay(end)) {
        runningCount += 1;
      }
    } while (runningCount < dayCount);
    return {
      start,
      end
    };
  }
  // Builds a normalized range object for the "visible" range,
  // which is a way to define the currentRange and activeRange at the same time.
  buildCustomVisibleRange(date) {
    let {
      props
    } = this;
    let input = props.visibleRangeInput;
    let simpleInput = typeof input === 'function' ? input.call(props.calendarApi, props.dateEnv.toDate(date)) : input;
    let range = this.refineRange(simpleInput);
    if (range && (range.start == null || range.end == null)) {
      return null;
    }
    return range;
  }
  // Computes the range that will represent the element/cells for *rendering*,
  // but which may have voided days/times.
  // not responsible for trimming hidden days.
  buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
    return currentRange;
  }
  // Compute the duration value that should be added/substracted to the current date
  // when a prev/next operation happens.
  buildDateIncrement(fallback) {
    let {
      dateIncrement
    } = this.props;
    let customAlignment;
    if (dateIncrement) {
      return dateIncrement;
    }
    if (customAlignment = this.props.dateAlignment) {
      return createDuration(1, customAlignment);
    }
    if (fallback) {
      return fallback;
    }
    return createDuration({
      days: 1
    });
  }
  refineRange(rangeInput) {
    if (rangeInput) {
      let range = parseRange(rangeInput, this.props.dateEnv);
      if (range) {
        range = computeVisibleDayRange(range);
      }
      return range;
    }
    return null;
  }
  /* Hidden Days
  ------------------------------------------------------------------------------------------------------------------*/
  // Initializes internal variables related to calculating hidden days-of-week
  initHiddenDays() {
    let hiddenDays = this.props.hiddenDays || []; // array of day-of-week indices that are hidden
    let isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
    let dayCnt = 0;
    let i;
    if (this.props.weekends === false) {
      hiddenDays.push(0, 6); // 0=sunday, 6=saturday
    }
    for (i = 0; i < 7; i += 1) {
      if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) {
        dayCnt += 1;
      }
    }
    if (!dayCnt) {
      throw new Error('invalid hiddenDays'); // all days were hidden? bad.
    }
    this.isHiddenDayHash = isHiddenDayHash;
  }
  // Remove days from the beginning and end of the range that are computed as hidden.
  // If the whole range is trimmed off, returns null
  trimHiddenDays(range) {
    let {
      start,
      end
    } = range;
    if (start) {
      start = this.skipHiddenDays(start);
    }
    if (end) {
      end = this.skipHiddenDays(end, -1, true);
    }
    if (start == null || end == null || start < end) {
      return {
        start,
        end
      };
    }
    return null;
  }
  // Is the current day hidden?
  // `day` is a day-of-week index (0-6), or a Date (used for UTC)
  isHiddenDay(day) {
    if (day instanceof Date) {
      day = day.getUTCDay();
    }
    return this.isHiddenDayHash[day];
  }
  // Incrementing the current day until it is no longer a hidden day, returning a copy.
  // DOES NOT CONSIDER validRange!
  // If the initial value of `date` is not a hidden day, don't do anything.
  // Pass `isExclusive` as `true` if you are dealing with an end date.
  // `inc` defaults to `1` (increment one day forward each time)
  skipHiddenDays(date, inc = 1, isExclusive = false) {
    while (this.isHiddenDayHash[(date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7]) {
      date = addDays(date, inc);
    }
    return date;
  }
}
function createEventInstance(defId, range, forcedStartTzo, forcedEndTzo) {
  return {
    instanceId: guid(),
    defId,
    range,
    forcedStartTzo: forcedStartTzo == null ? null : forcedStartTzo,
    forcedEndTzo: forcedEndTzo == null ? null : forcedEndTzo
  };
}
function parseRecurring(refined, defaultAllDay, dateEnv, recurringTypes) {
  for (let i = 0; i < recurringTypes.length; i += 1) {
    let parsed = recurringTypes[i].parse(refined, dateEnv);
    if (parsed) {
      let {
        allDay
      } = refined;
      if (allDay == null) {
        allDay = defaultAllDay;
        if (allDay == null) {
          allDay = parsed.allDayGuess;
          if (allDay == null) {
            allDay = false;
          }
        }
      }
      return {
        allDay,
        duration: parsed.duration,
        typeData: parsed.typeData,
        typeId: i
      };
    }
  }
  return null;
}
function expandRecurring(eventStore, framingRange, context) {
  let {
    dateEnv,
    pluginHooks,
    options
  } = context;
  let {
    defs,
    instances
  } = eventStore;
  // remove existing recurring instances
  // TODO: bad. always expand events as a second step
  instances = filterHash(instances, instance => !defs[instance.defId].recurringDef);
  for (let defId in defs) {
    let def = defs[defId];
    if (def.recurringDef) {
      let {
        duration
      } = def.recurringDef;
      if (!duration) {
        duration = def.allDay ? options.defaultAllDayEventDuration : options.defaultTimedEventDuration;
      }
      let starts = expandRecurringRanges(def, duration, framingRange, dateEnv, pluginHooks.recurringTypes);
      for (let start of starts) {
        let instance = createEventInstance(defId, {
          start,
          end: dateEnv.add(start, duration)
        });
        instances[instance.instanceId] = instance;
      }
    }
  }
  return {
    defs,
    instances
  };
}
/*
Event MUST have a recurringDef
*/
function expandRecurringRanges(eventDef, duration, framingRange, dateEnv, recurringTypes) {
  let typeDef = recurringTypes[eventDef.recurringDef.typeId];
  let markers = typeDef.expand(eventDef.recurringDef.typeData, {
    start: dateEnv.subtract(framingRange.start, duration),
    end: framingRange.end
  }, dateEnv);
  // the recurrence plugins don't guarantee that all-day events are start-of-day, so we have to
  if (eventDef.allDay) {
    markers = markers.map(startOfDay);
  }
  return markers;
}
const EVENT_NON_DATE_REFINERS = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
};
const EVENT_DATE_REFINERS = {
  start: identity,
  end: identity,
  date: identity,
  allDay: Boolean
};
const EVENT_REFINERS = Object.assign(Object.assign(Object.assign({}, EVENT_NON_DATE_REFINERS), EVENT_DATE_REFINERS), {
  extendedProps: identity
});
function parseEvent(raw, eventSource, context, allowOpenRange, refiners = buildEventRefiners(context), defIdMap, instanceIdMap) {
  let {
    refined,
    extra
  } = refineEventDef(raw, context, refiners);
  let defaultAllDay = computeIsDefaultAllDay(eventSource, context);
  let recurringRes = parseRecurring(refined, defaultAllDay, context.dateEnv, context.pluginHooks.recurringTypes);
  if (recurringRes) {
    let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', recurringRes.allDay, Boolean(recurringRes.duration), context, defIdMap);
    def.recurringDef = {
      typeId: recurringRes.typeId,
      typeData: recurringRes.typeData,
      duration: recurringRes.duration
    };
    return {
      def,
      instance: null
    };
  }
  let singleRes = parseSingle(refined, defaultAllDay, context, allowOpenRange);
  if (singleRes) {
    let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', singleRes.allDay, singleRes.hasEnd, context, defIdMap);
    let instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo);
    if (instanceIdMap && def.publicId && instanceIdMap[def.publicId]) {
      instance.instanceId = instanceIdMap[def.publicId];
    }
    return {
      def,
      instance
    };
  }
  return null;
}
function refineEventDef(raw, context, refiners = buildEventRefiners(context)) {
  return refineProps(raw, refiners);
}
function buildEventRefiners(context) {
  return Object.assign(Object.assign(Object.assign({}, EVENT_UI_REFINERS), EVENT_REFINERS), context.pluginHooks.eventRefiners);
}
/*
Will NOT populate extendedProps with the leftover properties.
Will NOT populate date-related props.
*/
function parseEventDef(refined, extra, sourceId, allDay, hasEnd, context, defIdMap) {
  let def = {
    title: refined.title || '',
    groupId: refined.groupId || '',
    publicId: refined.id || '',
    url: refined.url || '',
    recurringDef: null,
    defId: (defIdMap && refined.id ? defIdMap[refined.id] : '') || guid(),
    sourceId,
    allDay,
    hasEnd,
    interactive: refined.interactive,
    ui: createEventUi(refined, context),
    extendedProps: Object.assign(Object.assign({}, refined.extendedProps || {}), extra)
  };
  for (let memberAdder of context.pluginHooks.eventDefMemberAdders) {
    Object.assign(def, memberAdder(refined));
  }
  // help out EventImpl from having user modify props
  Object.freeze(def.ui.classNames);
  Object.freeze(def.extendedProps);
  return def;
}
function parseSingle(refined, defaultAllDay, context, allowOpenRange) {
  let {
    allDay
  } = refined;
  let startMeta;
  let startMarker = null;
  let hasEnd = false;
  let endMeta;
  let endMarker = null;
  let startInput = refined.start != null ? refined.start : refined.date;
  startMeta = context.dateEnv.createMarkerMeta(startInput);
  if (startMeta) {
    startMarker = startMeta.marker;
  } else if (!allowOpenRange) {
    return null;
  }
  if (refined.end != null) {
    endMeta = context.dateEnv.createMarkerMeta(refined.end);
  }
  if (allDay == null) {
    if (defaultAllDay != null) {
      allDay = defaultAllDay;
    } else {
      // fall back to the date props LAST
      allDay = (!startMeta || startMeta.isTimeUnspecified) && (!endMeta || endMeta.isTimeUnspecified);
    }
  }
  if (allDay && startMarker) {
    startMarker = startOfDay(startMarker);
  }
  if (endMeta) {
    endMarker = endMeta.marker;
    if (allDay) {
      endMarker = startOfDay(endMarker);
    }
    if (startMarker && endMarker <= startMarker) {
      endMarker = null;
    }
  }
  if (endMarker) {
    hasEnd = true;
  } else if (!allowOpenRange) {
    hasEnd = context.options.forceEventDuration || false;
    endMarker = context.dateEnv.add(startMarker, allDay ? context.options.defaultAllDayEventDuration : context.options.defaultTimedEventDuration);
  }
  return {
    allDay,
    hasEnd,
    range: {
      start: startMarker,
      end: endMarker
    },
    forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
    forcedEndTzo: endMeta ? endMeta.forcedTzo : null
  };
}
function computeIsDefaultAllDay(eventSource, context) {
  let res = null;
  if (eventSource) {
    res = eventSource.defaultAllDay;
  }
  if (res == null) {
    res = context.options.defaultAllDay;
  }
  return res;
}
function parseEvents(rawEvents, eventSource, context, allowOpenRange, defIdMap, instanceIdMap) {
  let eventStore = createEmptyEventStore();
  let eventRefiners = buildEventRefiners(context);
  for (let rawEvent of rawEvents) {
    let tuple = parseEvent(rawEvent, eventSource, context, allowOpenRange, eventRefiners, defIdMap, instanceIdMap);
    if (tuple) {
      eventTupleToStore(tuple, eventStore);
    }
  }
  return eventStore;
}
function eventTupleToStore(tuple, eventStore = createEmptyEventStore()) {
  eventStore.defs[tuple.def.defId] = tuple.def;
  if (tuple.instance) {
    eventStore.instances[tuple.instance.instanceId] = tuple.instance;
  }
  return eventStore;
}
// retrieves events that have the same groupId as the instance specified by `instanceId`
// or they are the same as the instance.
// why might instanceId not be in the store? an event from another calendar?
function getRelevantEvents(eventStore, instanceId) {
  let instance = eventStore.instances[instanceId];
  if (instance) {
    let def = eventStore.defs[instance.defId];
    // get events/instances with same group
    let newStore = filterEventStoreDefs(eventStore, lookDef => isEventDefsGrouped(def, lookDef));
    // add the original
    // TODO: wish we could use eventTupleToStore or something like it
    newStore.defs[def.defId] = def;
    newStore.instances[instance.instanceId] = instance;
    return newStore;
  }
  return createEmptyEventStore();
}
function isEventDefsGrouped(def0, def1) {
  return Boolean(def0.groupId && def0.groupId === def1.groupId);
}
function createEmptyEventStore() {
  return {
    defs: {},
    instances: {}
  };
}
function mergeEventStores(store0, store1) {
  return {
    defs: Object.assign(Object.assign({}, store0.defs), store1.defs),
    instances: Object.assign(Object.assign({}, store0.instances), store1.instances)
  };
}
function filterEventStoreDefs(eventStore, filterFunc) {
  let defs = filterHash(eventStore.defs, filterFunc);
  let instances = filterHash(eventStore.instances, instance => defs[instance.defId] // still exists?
  );
  return {
    defs,
    instances
  };
}
function excludeSubEventStore(master, sub) {
  let {
    defs,
    instances
  } = master;
  let filteredDefs = {};
  let filteredInstances = {};
  for (let defId in defs) {
    if (!sub.defs[defId]) {
      // not explicitly excluded
      filteredDefs[defId] = defs[defId];
    }
  }
  for (let instanceId in instances) {
    if (!sub.instances[instanceId] &&
    // not explicitly excluded
    filteredDefs[instances[instanceId].defId] // def wasn't filtered away
    ) {
      filteredInstances[instanceId] = instances[instanceId];
    }
  }
  return {
    defs: filteredDefs,
    instances: filteredInstances
  };
}
function normalizeConstraint(input, context) {
  if (Array.isArray(input)) {
    return parseEvents(input, null, context, true); // allowOpenRange=true
  }
  if (typeof input === 'object' && input) {
    // non-null object
    return parseEvents([input], null, context, true); // allowOpenRange=true
  }
  if (input != null) {
    return String(input);
  }
  return null;
}
function parseClassNames(raw) {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === 'string') {
    return raw.split(/\s+/);
  }
  return [];
}

// TODO: better called "EventSettings" or "EventConfig"
// TODO: move this file into structs
// TODO: separate constraint/overlap/allow, because selection uses only that, not other props
const EVENT_UI_REFINERS = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: identity,
  overlap: identity,
  allow: identity,
  className: parseClassNames,
  classNames: parseClassNames,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
};
const EMPTY_EVENT_UI = {
  display: null,
  startEditable: null,
  durationEditable: null,
  constraints: [],
  overlap: null,
  allows: [],
  backgroundColor: '',
  borderColor: '',
  textColor: '',
  classNames: []
};
function createEventUi(refined, context) {
  let constraint = normalizeConstraint(refined.constraint, context);
  return {
    display: refined.display || null,
    startEditable: refined.startEditable != null ? refined.startEditable : refined.editable,
    durationEditable: refined.durationEditable != null ? refined.durationEditable : refined.editable,
    constraints: constraint != null ? [constraint] : [],
    overlap: refined.overlap != null ? refined.overlap : null,
    allows: refined.allow != null ? [refined.allow] : [],
    backgroundColor: refined.backgroundColor || refined.color || '',
    borderColor: refined.borderColor || refined.color || '',
    textColor: refined.textColor || '',
    classNames: (refined.className || []).concat(refined.classNames || []) // join singular and plural
  };
}
// TODO: prevent against problems with <2 args!
function combineEventUis(uis) {
  return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI);
}
function combineTwoEventUis(item0, item1) {
  return {
    display: item1.display != null ? item1.display : item0.display,
    startEditable: item1.startEditable != null ? item1.startEditable : item0.startEditable,
    durationEditable: item1.durationEditable != null ? item1.durationEditable : item0.durationEditable,
    constraints: item0.constraints.concat(item1.constraints),
    overlap: typeof item1.overlap === 'boolean' ? item1.overlap : item0.overlap,
    allows: item0.allows.concat(item1.allows),
    backgroundColor: item1.backgroundColor || item0.backgroundColor,
    borderColor: item1.borderColor || item0.borderColor,
    textColor: item1.textColor || item0.textColor,
    classNames: item0.classNames.concat(item1.classNames)
  };
}
const EVENT_SOURCE_REFINERS = {
  id: String,
  defaultAllDay: Boolean,
  url: String,
  format: String,
  events: identity,
  eventDataTransform: identity,
  // for any network-related sources
  success: identity,
  failure: identity
};
function parseEventSource(raw, context, refiners = buildEventSourceRefiners(context)) {
  let rawObj;
  if (typeof raw === 'string') {
    rawObj = {
      url: raw
    };
  } else if (typeof raw === 'function' || Array.isArray(raw)) {
    rawObj = {
      events: raw
    };
  } else if (typeof raw === 'object' && raw) {
    // not null
    rawObj = raw;
  }
  if (rawObj) {
    let {
      refined,
      extra
    } = refineProps(rawObj, refiners);
    let metaRes = buildEventSourceMeta(refined, context);
    if (metaRes) {
      return {
        _raw: raw,
        isFetching: false,
        latestFetchId: '',
        fetchRange: null,
        defaultAllDay: refined.defaultAllDay,
        eventDataTransform: refined.eventDataTransform,
        success: refined.success,
        failure: refined.failure,
        publicId: refined.id || '',
        sourceId: guid(),
        sourceDefId: metaRes.sourceDefId,
        meta: metaRes.meta,
        ui: createEventUi(refined, context),
        extendedProps: extra
      };
    }
  }
  return null;
}
function buildEventSourceRefiners(context) {
  return Object.assign(Object.assign(Object.assign({}, EVENT_UI_REFINERS), EVENT_SOURCE_REFINERS), context.pluginHooks.eventSourceRefiners);
}
function buildEventSourceMeta(raw, context) {
  let defs = context.pluginHooks.eventSourceDefs;
  for (let i = defs.length - 1; i >= 0; i -= 1) {
    // later-added plugins take precedence
    let def = defs[i];
    let meta = def.parseMeta(raw);
    if (meta) {
      return {
        sourceDefId: i,
        meta
      };
    }
  }
  return null;
}
function reduceEventStore(eventStore, action, eventSources, dateProfile, context) {
  switch (action.type) {
    case 'RECEIVE_EVENTS':
      // raw
      return receiveRawEvents(eventStore, eventSources[action.sourceId], action.fetchId, action.fetchRange, action.rawEvents, context);
    case 'RESET_RAW_EVENTS':
      return resetRawEvents(eventStore, eventSources[action.sourceId], action.rawEvents, dateProfile.activeRange, context);
    case 'ADD_EVENTS':
      // already parsed, but not expanded
      return addEvent(eventStore, action.eventStore,
      // new ones
      dateProfile ? dateProfile.activeRange : null, context);
    case 'RESET_EVENTS':
      return action.eventStore;
    case 'MERGE_EVENTS':
      // already parsed and expanded
      return mergeEventStores(eventStore, action.eventStore);
    case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
    case 'NEXT':
    case 'CHANGE_DATE':
    case 'CHANGE_VIEW_TYPE':
      if (dateProfile) {
        return expandRecurring(eventStore, dateProfile.activeRange, context);
      }
      return eventStore;
    case 'REMOVE_EVENTS':
      return excludeSubEventStore(eventStore, action.eventStore);
    case 'REMOVE_EVENT_SOURCE':
      return excludeEventsBySourceId(eventStore, action.sourceId);
    case 'REMOVE_ALL_EVENT_SOURCES':
      return filterEventStoreDefs(eventStore, eventDef => !eventDef.sourceId // only keep events with no source id
      );
    case 'REMOVE_ALL_EVENTS':
      return createEmptyEventStore();
    default:
      return eventStore;
  }
}
function receiveRawEvents(eventStore, eventSource, fetchId, fetchRange, rawEvents, context) {
  if (eventSource &&
  // not already removed
  fetchId === eventSource.latestFetchId // TODO: wish this logic was always in event-sources
  ) {
    let subset = parseEvents(transformRawEvents(rawEvents, eventSource, context), eventSource, context);
    if (fetchRange) {
      subset = expandRecurring(subset, fetchRange, context);
    }
    return mergeEventStores(excludeEventsBySourceId(eventStore, eventSource.sourceId), subset);
  }
  return eventStore;
}
function resetRawEvents(existingEventStore, eventSource, rawEvents, activeRange, context) {
  const {
    defIdMap,
    instanceIdMap
  } = buildPublicIdMaps(existingEventStore);
  let newEventStore = parseEvents(transformRawEvents(rawEvents, eventSource, context), eventSource, context, false, defIdMap, instanceIdMap);
  return expandRecurring(newEventStore, activeRange, context);
}
function transformRawEvents(rawEvents, eventSource, context) {
  let calEachTransform = context.options.eventDataTransform;
  let sourceEachTransform = eventSource ? eventSource.eventDataTransform : null;
  if (sourceEachTransform) {
    rawEvents = transformEachRawEvent(rawEvents, sourceEachTransform);
  }
  if (calEachTransform) {
    rawEvents = transformEachRawEvent(rawEvents, calEachTransform);
  }
  return rawEvents;
}
function transformEachRawEvent(rawEvents, func) {
  let refinedEvents;
  if (!func) {
    refinedEvents = rawEvents;
  } else {
    refinedEvents = [];
    for (let rawEvent of rawEvents) {
      let refinedEvent = func(rawEvent);
      if (refinedEvent) {
        refinedEvents.push(refinedEvent);
      } else if (refinedEvent == null) {
        refinedEvents.push(rawEvent);
      } // if a different falsy value, do nothing
    }
  }
  return refinedEvents;
}
function addEvent(eventStore, subset, expandRange, context) {
  if (expandRange) {
    subset = expandRecurring(subset, expandRange, context);
  }
  return mergeEventStores(eventStore, subset);
}
function rezoneEventStoreDates(eventStore, oldDateEnv, newDateEnv) {
  let {
    defs
  } = eventStore;
  let instances = mapHash(eventStore.instances, instance => {
    let def = defs[instance.defId];
    if (def.allDay) {
      return instance; // isn't dependent on timezone
    }
    return Object.assign(Object.assign({}, instance), {
      range: {
        start: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.start, instance.forcedStartTzo)),
        end: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.end, instance.forcedEndTzo))
      },
      forcedStartTzo: newDateEnv.canComputeOffset ? null : instance.forcedStartTzo,
      forcedEndTzo: newDateEnv.canComputeOffset ? null : instance.forcedEndTzo
    });
  });
  return {
    defs,
    instances
  };
}
function excludeEventsBySourceId(eventStore, sourceId) {
  return filterEventStoreDefs(eventStore, eventDef => eventDef.sourceId !== sourceId);
}
// QUESTION: why not just return instances? do a general object-property-exclusion util
function excludeInstances(eventStore, removals) {
  return {
    defs: eventStore.defs,
    instances: filterHash(eventStore.instances, instance => !removals[instance.instanceId])
  };
}
function buildPublicIdMaps(eventStore) {
  const {
    defs,
    instances
  } = eventStore;
  const defIdMap = {};
  const instanceIdMap = {};
  for (let defId in defs) {
    const def = defs[defId];
    const {
      publicId
    } = def;
    if (publicId) {
      defIdMap[publicId] = defId;
    }
  }
  for (let instanceId in instances) {
    const instance = instances[instanceId];
    const def = defs[instance.defId];
    const {
      publicId
    } = def;
    if (publicId) {
      instanceIdMap[publicId] = instanceId;
    }
  }
  return {
    defIdMap,
    instanceIdMap
  };
}
class Emitter {
  constructor() {
    this.handlers = {};
    this.thisContext = null;
  }
  setThisContext(thisContext) {
    this.thisContext = thisContext;
  }
  setOptions(options) {
    this.options = options;
  }
  on(type, handler) {
    addToHash(this.handlers, type, handler);
  }
  off(type, handler) {
    removeFromHash(this.handlers, type, handler);
  }
  trigger(type, ...args) {
    let attachedHandlers = this.handlers[type] || [];
    let optionHandler = this.options && this.options[type];
    let handlers = [].concat(optionHandler || [], attachedHandlers);
    for (let handler of handlers) {
      handler.apply(this.thisContext, args);
    }
  }
  hasHandlers(type) {
    return Boolean(this.handlers[type] && this.handlers[type].length || this.options && this.options[type]);
  }
}
function addToHash(hash, type, handler) {
  (hash[type] || (hash[type] = [])).push(handler);
}
function removeFromHash(hash, type, handler) {
  if (handler) {
    if (hash[type]) {
      hash[type] = hash[type].filter(func => func !== handler);
    }
  } else {
    delete hash[type]; // remove all handler funcs for this type
  }
}
const DEF_DEFAULTS = {
  startTime: '09:00',
  endTime: '17:00',
  daysOfWeek: [1, 2, 3, 4, 5],
  display: 'inverse-background',
  classNames: 'fc-non-business',
  groupId: '_businessHours' // so multiple defs get grouped
};
/*
TODO: pass around as EventDefHash!!!
*/
function parseBusinessHours(input, context) {
  return parseEvents(refineInputs(input), null, context);
}
function refineInputs(input) {
  let rawDefs;
  if (input === true) {
    rawDefs = [{}]; // will get DEF_DEFAULTS verbatim
  } else if (Array.isArray(input)) {
    // if specifying an array, every sub-definition NEEDS a day-of-week
    rawDefs = input.filter(rawDef => rawDef.daysOfWeek);
  } else if (typeof input === 'object' && input) {
    // non-null object
    rawDefs = [input];
  } else {
    // is probably false
    rawDefs = [];
  }
  rawDefs = rawDefs.map(rawDef => Object.assign(Object.assign({}, DEF_DEFAULTS), rawDef));
  return rawDefs;
}
function triggerDateSelect(selection, pev, context) {
  context.emitter.trigger('select', Object.assign(Object.assign({}, buildDateSpanApiWithContext(selection, context)), {
    jsEvent: pev ? pev.origEvent : null,
    view: context.viewApi || context.calendarApi.view
  }));
}
function triggerDateUnselect(pev, context) {
  context.emitter.trigger('unselect', {
    jsEvent: pev ? pev.origEvent : null,
    view: context.viewApi || context.calendarApi.view
  });
}
function buildDateSpanApiWithContext(dateSpan, context) {
  let props = {};
  for (let transform of context.pluginHooks.dateSpanTransforms) {
    Object.assign(props, transform(dateSpan, context));
  }
  Object.assign(props, buildDateSpanApi(dateSpan, context.dateEnv));
  return props;
}
// Given an event's allDay status and start date, return what its fallback end date should be.
// TODO: rename to computeDefaultEventEnd
function getDefaultEventEnd(allDay, marker, context) {
  let {
    dateEnv,
    options
  } = context;
  let end = marker;
  if (allDay) {
    end = startOfDay(end);
    end = dateEnv.add(end, options.defaultAllDayEventDuration);
  } else {
    end = dateEnv.add(end, options.defaultTimedEventDuration);
  }
  return end;
}

// applies the mutation to ALL defs/instances within the event store
function applyMutationToEventStore(eventStore, eventConfigBase, mutation, context) {
  let eventConfigs = compileEventUis(eventStore.defs, eventConfigBase);
  let dest = createEmptyEventStore();
  for (let defId in eventStore.defs) {
    let def = eventStore.defs[defId];
    dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, context);
  }
  for (let instanceId in eventStore.instances) {
    let instance = eventStore.instances[instanceId];
    let def = dest.defs[instance.defId]; // important to grab the newly modified def
    dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, context);
  }
  return dest;
}
function applyMutationToEventDef(eventDef, eventConfig, mutation, context) {
  let standardProps = mutation.standardProps || {};
  // if hasEnd has not been specified, guess a good value based on deltas.
  // if duration will change, there's no way the default duration will persist,
  // and thus, we need to mark the event as having a real end
  if (standardProps.hasEnd == null && eventConfig.durationEditable && (mutation.startDelta || mutation.endDelta)) {
    standardProps.hasEnd = true; // TODO: is this mutation okay?
  }
  let copy = Object.assign(Object.assign(Object.assign({}, eventDef), standardProps), {
    ui: Object.assign(Object.assign({}, eventDef.ui), standardProps.ui)
  });
  if (mutation.extendedProps) {
    copy.extendedProps = Object.assign(Object.assign({}, copy.extendedProps), mutation.extendedProps);
  }
  for (let applier of context.pluginHooks.eventDefMutationAppliers) {
    applier(copy, mutation, context);
  }
  if (!copy.hasEnd && context.options.forceEventDuration) {
    copy.hasEnd = true;
  }
  return copy;
}
function applyMutationToEventInstance(eventInstance, eventDef,
// must first be modified by applyMutationToEventDef
eventConfig, mutation, context) {
  let {
    dateEnv
  } = context;
  let forceAllDay = mutation.standardProps && mutation.standardProps.allDay === true;
  let clearEnd = mutation.standardProps && mutation.standardProps.hasEnd === false;
  let copy = Object.assign({}, eventInstance);
  if (forceAllDay) {
    copy.range = computeAlignedDayRange(copy.range);
  }
  if (mutation.datesDelta && eventConfig.startEditable) {
    copy.range = {
      start: dateEnv.add(copy.range.start, mutation.datesDelta),
      end: dateEnv.add(copy.range.end, mutation.datesDelta)
    };
  }
  if (mutation.startDelta && eventConfig.durationEditable) {
    copy.range = {
      start: dateEnv.add(copy.range.start, mutation.startDelta),
      end: copy.range.end
    };
  }
  if (mutation.endDelta && eventConfig.durationEditable) {
    copy.range = {
      start: copy.range.start,
      end: dateEnv.add(copy.range.end, mutation.endDelta)
    };
  }
  if (clearEnd) {
    copy.range = {
      start: copy.range.start,
      end: getDefaultEventEnd(eventDef.allDay, copy.range.start, context)
    };
  }
  // in case event was all-day but the supplied deltas were not
  // better util for this?
  if (eventDef.allDay) {
    copy.range = {
      start: startOfDay(copy.range.start),
      end: startOfDay(copy.range.end)
    };
  }
  // handle invalid durations
  if (copy.range.end < copy.range.start) {
    copy.range.end = getDefaultEventEnd(eventDef.allDay, copy.range.start, context);
  }
  return copy;
}
class EventSourceImpl {
  constructor(context, internalEventSource) {
    this.context = context;
    this.internalEventSource = internalEventSource;
  }
  remove() {
    this.context.dispatch({
      type: 'REMOVE_EVENT_SOURCE',
      sourceId: this.internalEventSource.sourceId
    });
  }
  refetch() {
    this.context.dispatch({
      type: 'FETCH_EVENT_SOURCES',
      sourceIds: [this.internalEventSource.sourceId],
      isRefetch: true
    });
  }
  get id() {
    return this.internalEventSource.publicId;
  }
  get url() {
    return this.internalEventSource.meta.url;
  }
  get format() {
    return this.internalEventSource.meta.format; // TODO: bad. not guaranteed
  }
}
class EventImpl {
  // instance will be null if expressing a recurring event that has no current instances,
  // OR if trying to validate an incoming external event that has no dates assigned
  constructor(context, def, instance) {
    this._context = context;
    this._def = def;
    this._instance = instance || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(name, val) {
    if (name in EVENT_DATE_REFINERS) {
      console.warn('Could not set date-related prop \'name\'. Use one of the date-related methods instead.');
      // TODO: make proper aliasing system?
    } else if (name === 'id') {
      val = EVENT_NON_DATE_REFINERS[name](val);
      this.mutate({
        standardProps: {
          publicId: val
        } // hardcoded internal name
      });
    } else if (name in EVENT_NON_DATE_REFINERS) {
      val = EVENT_NON_DATE_REFINERS[name](val);
      this.mutate({
        standardProps: {
          [name]: val
        }
      });
    } else if (name in EVENT_UI_REFINERS) {
      let ui = EVENT_UI_REFINERS[name](val);
      if (name === 'color') {
        ui = {
          backgroundColor: val,
          borderColor: val
        };
      } else if (name === 'editable') {
        ui = {
          startEditable: val,
          durationEditable: val
        };
      } else {
        ui = {
          [name]: val
        };
      }
      this.mutate({
        standardProps: {
          ui
        }
      });
    } else {
      console.warn(`Could not set prop '${name}'. Use setExtendedProp instead.`);
    }
  }
  setExtendedProp(name, val) {
    this.mutate({
      extendedProps: {
        [name]: val
      }
    });
  }
  setStart(startInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let start = dateEnv.createMarker(startInput);
    if (start && this._instance) {
      // TODO: warning if parsed bad
      let instanceRange = this._instance.range;
      let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity); // what if parsed bad!?
      if (options.maintainDuration) {
        this.mutate({
          datesDelta: startDelta
        });
      } else {
        this.mutate({
          startDelta
        });
      }
    }
  }
  setEnd(endInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let end;
    if (endInput != null) {
      end = dateEnv.createMarker(endInput);
      if (!end) {
        return; // TODO: warning if parsed bad
      }
    }
    if (this._instance) {
      if (end) {
        let endDelta = diffDates(this._instance.range.end, end, dateEnv, options.granularity);
        this.mutate({
          endDelta
        });
      } else {
        this.mutate({
          standardProps: {
            hasEnd: false
          }
        });
      }
    }
  }
  setDates(startInput, endInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let standardProps = {
      allDay: options.allDay
    };
    let start = dateEnv.createMarker(startInput);
    let end;
    if (!start) {
      return; // TODO: warning if parsed bad
    }
    if (endInput != null) {
      end = dateEnv.createMarker(endInput);
      if (!end) {
        // TODO: warning if parsed bad
        return;
      }
    }
    if (this._instance) {
      let instanceRange = this._instance.range;
      // when computing the diff for an event being converted to all-day,
      // compute diff off of the all-day values the way event-mutation does.
      if (options.allDay === true) {
        instanceRange = computeAlignedDayRange(instanceRange);
      }
      let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity);
      if (end) {
        let endDelta = diffDates(instanceRange.end, end, dateEnv, options.granularity);
        if (durationsEqual(startDelta, endDelta)) {
          this.mutate({
            datesDelta: startDelta,
            standardProps
          });
        } else {
          this.mutate({
            startDelta,
            endDelta,
            standardProps
          });
        }
      } else {
        // means "clear the end"
        standardProps.hasEnd = false;
        this.mutate({
          datesDelta: startDelta,
          standardProps
        });
      }
    }
  }
  moveStart(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        startDelta: delta
      });
    }
  }
  moveEnd(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        endDelta: delta
      });
    }
  }
  moveDates(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        datesDelta: delta
      });
    }
  }
  setAllDay(allDay, options = {}) {
    let standardProps = {
      allDay
    };
    let {
      maintainDuration
    } = options;
    if (maintainDuration == null) {
      maintainDuration = this._context.options.allDayMaintainDuration;
    }
    if (this._def.allDay !== allDay) {
      standardProps.hasEnd = maintainDuration;
    }
    this.mutate({
      standardProps
    });
  }
  formatRange(formatInput) {
    let {
      dateEnv
    } = this._context;
    let instance = this._instance;
    let formatter = createFormatter(formatInput);
    if (this._def.hasEnd) {
      return dateEnv.formatRange(instance.range.start, instance.range.end, formatter, {
        forcedStartTzo: instance.forcedStartTzo,
        forcedEndTzo: instance.forcedEndTzo
      });
    }
    return dateEnv.format(instance.range.start, formatter, {
      forcedTzo: instance.forcedStartTzo
    });
  }
  mutate(mutation) {
    let instance = this._instance;
    if (instance) {
      let def = this._def;
      let context = this._context;
      let {
        eventStore
      } = context.getCurrentData();
      let relevantEvents = getRelevantEvents(eventStore, instance.instanceId);
      let eventConfigBase = {
        '': {
          display: '',
          startEditable: true,
          durationEditable: true,
          constraints: [],
          overlap: null,
          allows: [],
          backgroundColor: '',
          borderColor: '',
          textColor: '',
          classNames: []
        }
      };
      relevantEvents = applyMutationToEventStore(relevantEvents, eventConfigBase, mutation, context);
      let oldEvent = new EventImpl(context, def, instance); // snapshot
      this._def = relevantEvents.defs[def.defId];
      this._instance = relevantEvents.instances[instance.instanceId];
      context.dispatch({
        type: 'MERGE_EVENTS',
        eventStore: relevantEvents
      });
      context.emitter.trigger('eventChange', {
        oldEvent,
        event: this,
        relatedEvents: buildEventApis(relevantEvents, context, instance),
        revert() {
          context.dispatch({
            type: 'RESET_EVENTS',
            eventStore // the ORIGINAL store
          });
        }
      });
    }
  }
  remove() {
    let context = this._context;
    let asStore = eventApiToStore(this);
    context.dispatch({
      type: 'REMOVE_EVENTS',
      eventStore: asStore
    });
    context.emitter.trigger('eventRemove', {
      event: this,
      relatedEvents: [],
      revert() {
        context.dispatch({
          type: 'MERGE_EVENTS',
          eventStore: asStore
        });
      }
    });
  }
  get source() {
    let {
      sourceId
    } = this._def;
    if (sourceId) {
      return new EventSourceImpl(this._context, this._context.getCurrentData().eventSources[sourceId]);
    }
    return null;
  }
  get start() {
    return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null;
  }
  get end() {
    return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null;
  }
  get startStr() {
    let instance = this._instance;
    if (instance) {
      return this._context.dateEnv.formatIso(instance.range.start, {
        omitTime: this._def.allDay,
        forcedTzo: instance.forcedStartTzo
      });
    }
    return '';
  }
  get endStr() {
    let instance = this._instance;
    if (instance && this._def.hasEnd) {
      return this._context.dateEnv.formatIso(instance.range.end, {
        omitTime: this._def.allDay,
        forcedTzo: instance.forcedEndTzo
      });
    }
    return '';
  }
  // computable props that all access the def
  // TODO: find a TypeScript-compatible way to do this at scale
  get id() {
    return this._def.publicId;
  }
  get groupId() {
    return this._def.groupId;
  }
  get allDay() {
    return this._def.allDay;
  }
  get title() {
    return this._def.title;
  }
  get url() {
    return this._def.url;
  }
  get display() {
    return this._def.ui.display || 'auto';
  } // bad. just normalize the type earlier
  get startEditable() {
    return this._def.ui.startEditable;
  }
  get durationEditable() {
    return this._def.ui.durationEditable;
  }
  get constraint() {
    return this._def.ui.constraints[0] || null;
  }
  get overlap() {
    return this._def.ui.overlap;
  }
  get allow() {
    return this._def.ui.allows[0] || null;
  }
  get backgroundColor() {
    return this._def.ui.backgroundColor;
  }
  get borderColor() {
    return this._def.ui.borderColor;
  }
  get textColor() {
    return this._def.ui.textColor;
  }
  // NOTE: user can't modify these because Object.freeze was called in event-def parsing
  get classNames() {
    return this._def.ui.classNames;
  }
  get extendedProps() {
    return this._def.extendedProps;
  }
  toPlainObject(settings = {}) {
    let def = this._def;
    let {
      ui
    } = def;
    let {
      startStr,
      endStr
    } = this;
    let res = {
      allDay: def.allDay
    };
    if (def.title) {
      res.title = def.title;
    }
    if (startStr) {
      res.start = startStr;
    }
    if (endStr) {
      res.end = endStr;
    }
    if (def.publicId) {
      res.id = def.publicId;
    }
    if (def.groupId) {
      res.groupId = def.groupId;
    }
    if (def.url) {
      res.url = def.url;
    }
    if (ui.display && ui.display !== 'auto') {
      res.display = ui.display;
    }
    // TODO: what about recurring-event properties???
    // TODO: include startEditable/durationEditable/constraint/overlap/allow
    if (settings.collapseColor && ui.backgroundColor && ui.backgroundColor === ui.borderColor) {
      res.color = ui.backgroundColor;
    } else {
      if (ui.backgroundColor) {
        res.backgroundColor = ui.backgroundColor;
      }
      if (ui.borderColor) {
        res.borderColor = ui.borderColor;
      }
    }
    if (ui.textColor) {
      res.textColor = ui.textColor;
    }
    if (ui.classNames.length) {
      res.classNames = ui.classNames;
    }
    if (Object.keys(def.extendedProps).length) {
      if (settings.collapseExtendedProps) {
        Object.assign(res, def.extendedProps);
      } else {
        res.extendedProps = def.extendedProps;
      }
    }
    return res;
  }
  toJSON() {
    return this.toPlainObject();
  }
}
function eventApiToStore(eventApi) {
  let def = eventApi._def;
  let instance = eventApi._instance;
  return {
    defs: {
      [def.defId]: def
    },
    instances: instance ? {
      [instance.instanceId]: instance
    } : {}
  };
}
function buildEventApis(eventStore, context, excludeInstance) {
  let {
    defs,
    instances
  } = eventStore;
  let eventApis = [];
  let excludeInstanceId = excludeInstance ? excludeInstance.instanceId : '';
  for (let id in instances) {
    let instance = instances[id];
    let def = defs[instance.defId];
    if (instance.instanceId !== excludeInstanceId) {
      eventApis.push(new EventImpl(context, def, instance));
    }
  }
  return eventApis;
}

/*
Specifying nextDayThreshold signals that all-day ranges should be sliced.
*/
function sliceEventStore(eventStore, eventUiBases, framingRange, nextDayThreshold) {
  let inverseBgByGroupId = {};
  let inverseBgByDefId = {};
  let defByGroupId = {};
  let bgRanges = [];
  let fgRanges = [];
  let eventUis = compileEventUis(eventStore.defs, eventUiBases);
  for (let defId in eventStore.defs) {
    let def = eventStore.defs[defId];
    let ui = eventUis[def.defId];
    if (ui.display === 'inverse-background') {
      if (def.groupId) {
        inverseBgByGroupId[def.groupId] = [];
        if (!defByGroupId[def.groupId]) {
          defByGroupId[def.groupId] = def;
        }
      } else {
        inverseBgByDefId[defId] = [];
      }
    }
  }
  for (let instanceId in eventStore.instances) {
    let instance = eventStore.instances[instanceId];
    let def = eventStore.defs[instance.defId];
    let ui = eventUis[def.defId];
    let origRange = instance.range;
    let normalRange = !def.allDay && nextDayThreshold ? computeVisibleDayRange(origRange, nextDayThreshold) : origRange;
    let slicedRange = intersectRanges(normalRange, framingRange);
    if (slicedRange) {
      if (ui.display === 'inverse-background') {
        if (def.groupId) {
          inverseBgByGroupId[def.groupId].push(slicedRange);
        } else {
          inverseBgByDefId[instance.defId].push(slicedRange);
        }
      } else if (ui.display !== 'none') {
        (ui.display === 'background' ? bgRanges : fgRanges).push({
          def,
          ui,
          instance,
          range: slicedRange,
          isStart: normalRange.start && normalRange.start.valueOf() === slicedRange.start.valueOf(),
          isEnd: normalRange.end && normalRange.end.valueOf() === slicedRange.end.valueOf()
        });
      }
    }
  }
  for (let groupId in inverseBgByGroupId) {
    // BY GROUP
    let ranges = inverseBgByGroupId[groupId];
    let invertedRanges = invertRanges(ranges, framingRange);
    for (let invertedRange of invertedRanges) {
      let def = defByGroupId[groupId];
      let ui = eventUis[def.defId];
      bgRanges.push({
        def,
        ui,
        instance: null,
        range: invertedRange,
        isStart: false,
        isEnd: false
      });
    }
  }
  for (let defId in inverseBgByDefId) {
    let ranges = inverseBgByDefId[defId];
    let invertedRanges = invertRanges(ranges, framingRange);
    for (let invertedRange of invertedRanges) {
      bgRanges.push({
        def: eventStore.defs[defId],
        ui: eventUis[defId],
        instance: null,
        range: invertedRange,
        isStart: false,
        isEnd: false
      });
    }
  }
  return {
    bg: bgRanges,
    fg: fgRanges
  };
}
function hasBgRendering(def) {
  return def.ui.display === 'background' || def.ui.display === 'inverse-background';
}
function setElSeg(el, seg) {
  el.fcSeg = seg;
}
function getElSeg(el) {
  return el.fcSeg || el.parentNode.fcSeg ||
  // for the harness
  null;
}
// event ui computation
function compileEventUis(eventDefs, eventUiBases) {
  return mapHash(eventDefs, eventDef => compileEventUi(eventDef, eventUiBases));
}
function compileEventUi(eventDef, eventUiBases) {
  let uis = [];
  if (eventUiBases['']) {
    uis.push(eventUiBases['']);
  }
  if (eventUiBases[eventDef.defId]) {
    uis.push(eventUiBases[eventDef.defId]);
  }
  uis.push(eventDef.ui);
  return combineEventUis(uis);
}
function sortEventSegs(segs, eventOrderSpecs) {
  let objs = segs.map(buildSegCompareObj);
  objs.sort((obj0, obj1) => compareByFieldSpecs(obj0, obj1, eventOrderSpecs));
  return objs.map(c => c._seg);
}
// returns a object with all primitive props that can be compared
function buildSegCompareObj(seg) {
  let {
    eventRange
  } = seg;
  let eventDef = eventRange.def;
  let range = eventRange.instance ? eventRange.instance.range : eventRange.range;
  let start = range.start ? range.start.valueOf() : 0; // TODO: better support for open-range events
  let end = range.end ? range.end.valueOf() : 0; // "
  return Object.assign(Object.assign(Object.assign({}, eventDef.extendedProps), eventDef), {
    id: eventDef.publicId,
    start,
    end,
    duration: end - start,
    allDay: Number(eventDef.allDay),
    _seg: seg
  });
}
function computeSegDraggable(seg, context) {
  let {
    pluginHooks
  } = context;
  let transformers = pluginHooks.isDraggableTransformers;
  let {
    def,
    ui
  } = seg.eventRange;
  let val = ui.startEditable;
  for (let transformer of transformers) {
    val = transformer(val, def, ui, context);
  }
  return val;
}
function computeSegStartResizable(seg, context) {
  return seg.isStart && seg.eventRange.ui.durationEditable && context.options.eventResizableFromStart;
}
function computeSegEndResizable(seg, context) {
  return seg.isEnd && seg.eventRange.ui.durationEditable;
}
function buildSegTimeText(seg, timeFormat, context, defaultDisplayEventTime,
// defaults to true
defaultDisplayEventEnd,
// defaults to true
startOverride, endOverride) {
  let {
    dateEnv,
    options
  } = context;
  let {
    displayEventTime,
    displayEventEnd
  } = options;
  let eventDef = seg.eventRange.def;
  let eventInstance = seg.eventRange.instance;
  if (displayEventTime == null) {
    displayEventTime = defaultDisplayEventTime !== false;
  }
  if (displayEventEnd == null) {
    displayEventEnd = defaultDisplayEventEnd !== false;
  }
  let wholeEventStart = eventInstance.range.start;
  let wholeEventEnd = eventInstance.range.end;
  let segStart = startOverride || seg.start || seg.eventRange.range.start;
  let segEnd = endOverride || seg.end || seg.eventRange.range.end;
  let isStartDay = startOfDay(wholeEventStart).valueOf() === startOfDay(segStart).valueOf();
  let isEndDay = startOfDay(addMs(wholeEventEnd, -1)).valueOf() === startOfDay(addMs(segEnd, -1)).valueOf();
  if (displayEventTime && !eventDef.allDay && (isStartDay || isEndDay)) {
    segStart = isStartDay ? wholeEventStart : segStart;
    segEnd = isEndDay ? wholeEventEnd : segEnd;
    if (displayEventEnd && eventDef.hasEnd) {
      return dateEnv.formatRange(segStart, segEnd, timeFormat, {
        forcedStartTzo: startOverride ? null : eventInstance.forcedStartTzo,
        forcedEndTzo: endOverride ? null : eventInstance.forcedEndTzo
      });
    }
    return dateEnv.format(segStart, timeFormat, {
      forcedTzo: startOverride ? null : eventInstance.forcedStartTzo // nooooo, same
    });
  }
  return '';
}
function getSegMeta(seg, todayRange, nowDate) {
  let segRange = seg.eventRange.range;
  return {
    isPast: segRange.end <= (nowDate || todayRange.start),
    isFuture: segRange.start >= (nowDate || todayRange.end),
    isToday: todayRange && rangeContainsMarker(todayRange, segRange.start)
  };
}
function getEventClassNames(props) {
  let classNames = ['fc-event'];
  if (props.isMirror) {
    classNames.push('fc-event-mirror');
  }
  if (props.isDraggable) {
    classNames.push('fc-event-draggable');
  }
  if (props.isStartResizable || props.isEndResizable) {
    classNames.push('fc-event-resizable');
  }
  if (props.isDragging) {
    classNames.push('fc-event-dragging');
  }
  if (props.isResizing) {
    classNames.push('fc-event-resizing');
  }
  if (props.isSelected) {
    classNames.push('fc-event-selected');
  }
  if (props.isStart) {
    classNames.push('fc-event-start');
  }
  if (props.isEnd) {
    classNames.push('fc-event-end');
  }
  if (props.isPast) {
    classNames.push('fc-event-past');
  }
  if (props.isToday) {
    classNames.push('fc-event-today');
  }
  if (props.isFuture) {
    classNames.push('fc-event-future');
  }
  return classNames;
}
function buildEventRangeKey(eventRange) {
  return eventRange.instance ? eventRange.instance.instanceId : `${eventRange.def.defId}:${eventRange.range.start.toISOString()}`;
  // inverse-background events don't have specific instances. TODO: better solution
}
function getSegAnchorAttrs(seg, context) {
  let {
    def,
    instance
  } = seg.eventRange;
  let {
    url
  } = def;
  if (url) {
    return {
      href: url
    };
  }
  let {
    emitter,
    options
  } = context;
  let {
    eventInteractive
  } = options;
  if (eventInteractive == null) {
    eventInteractive = def.interactive;
    if (eventInteractive == null) {
      eventInteractive = Boolean(emitter.hasHandlers('eventClick'));
    }
  }
  // mock what happens in EventClicking
  if (eventInteractive) {
    // only attach keyboard-related handlers because click handler is already done in EventClicking
    return createAriaKeyboardAttrs(ev => {
      emitter.trigger('eventClick', {
        el: ev.target,
        event: new EventImpl(context, def, instance),
        jsEvent: ev,
        view: context.viewApi
      });
    });
  }
  return {};
}
const STANDARD_PROPS = {
  start: identity,
  end: identity,
  allDay: Boolean
};
function parseDateSpan(raw, dateEnv, defaultDuration) {
  let span = parseOpenDateSpan(raw, dateEnv);
  let {
    range
  } = span;
  if (!range.start) {
    return null;
  }
  if (!range.end) {
    if (defaultDuration == null) {
      return null;
    }
    range.end = dateEnv.add(range.start, defaultDuration);
  }
  return span;
}
/*
TODO: somehow combine with parseRange?
Will return null if the start/end props were present but parsed invalidly.
*/
function parseOpenDateSpan(raw, dateEnv) {
  let {
    refined: standardProps,
    extra
  } = refineProps(raw, STANDARD_PROPS);
  let startMeta = standardProps.start ? dateEnv.createMarkerMeta(standardProps.start) : null;
  let endMeta = standardProps.end ? dateEnv.createMarkerMeta(standardProps.end) : null;
  let {
    allDay
  } = standardProps;
  if (allDay == null) {
    allDay = startMeta && startMeta.isTimeUnspecified && (!endMeta || endMeta.isTimeUnspecified);
  }
  return Object.assign({
    range: {
      start: startMeta ? startMeta.marker : null,
      end: endMeta ? endMeta.marker : null
    },
    allDay
  }, extra);
}
function isDateSpansEqual(span0, span1) {
  return rangesEqual(span0.range, span1.range) && span0.allDay === span1.allDay && isSpanPropsEqual(span0, span1);
}
// the NON-DATE-RELATED props
function isSpanPropsEqual(span0, span1) {
  for (let propName in span1) {
    if (propName !== 'range' && propName !== 'allDay') {
      if (span0[propName] !== span1[propName]) {
        return false;
      }
    }
  }
  // are there any props that span0 has that span1 DOESN'T have?
  // both have range/allDay, so no need to special-case.
  for (let propName in span0) {
    if (!(propName in span1)) {
      return false;
    }
  }
  return true;
}
function buildDateSpanApi(span, dateEnv) {
  return Object.assign(Object.assign({}, buildRangeApi(span.range, dateEnv, span.allDay)), {
    allDay: span.allDay
  });
}
function buildRangeApiWithTimeZone(range, dateEnv, omitTime) {
  return Object.assign(Object.assign({}, buildRangeApi(range, dateEnv, omitTime)), {
    timeZone: dateEnv.timeZone
  });
}
function buildRangeApi(range, dateEnv, omitTime) {
  return {
    start: dateEnv.toDate(range.start),
    end: dateEnv.toDate(range.end),
    startStr: dateEnv.formatIso(range.start, {
      omitTime
    }),
    endStr: dateEnv.formatIso(range.end, {
      omitTime
    })
  };
}
function fabricateEventRange(dateSpan, eventUiBases, context) {
  let res = refineEventDef({
    editable: false
  }, context);
  let def = parseEventDef(res.refined, res.extra, '',
  // sourceId
  dateSpan.allDay, true,
  // hasEnd
  context);
  return {
    def,
    ui: compileEventUi(def, eventUiBases),
    instance: createEventInstance(def.defId, dateSpan.range),
    range: dateSpan.range,
    isStart: true,
    isEnd: true
  };
}

/*
given a function that resolves a result asynchronously.
the function can either call passed-in success and failure callbacks,
or it can return a promise.
if you need to pass additional params to func, bind them first.
*/
function unpromisify(func, normalizedSuccessCallback, normalizedFailureCallback) {
  // guard against success/failure callbacks being called more than once
  // and guard against a promise AND callback being used together.
  let isResolved = false;
  let wrappedSuccess = function (res) {
    if (!isResolved) {
      isResolved = true;
      normalizedSuccessCallback(res);
    }
  };
  let wrappedFailure = function (error) {
    if (!isResolved) {
      isResolved = true;
      normalizedFailureCallback(error);
    }
  };
  let res = func(wrappedSuccess, wrappedFailure);
  if (res && typeof res.then === 'function') {
    res.then(wrappedSuccess, wrappedFailure);
  }
}
class JsonRequestError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
function requestJson(method, url, params) {
  method = method.toUpperCase();
  const fetchOptions = {
    method
  };
  if (method === 'GET') {
    url += (url.indexOf('?') === -1 ? '?' : '&') + new URLSearchParams(params);
  } else {
    fetchOptions.body = new URLSearchParams(params);
    fetchOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }
  return fetch(url, fetchOptions).then(fetchRes => {
    if (fetchRes.ok) {
      return fetchRes.json().then(parsedResponse => {
        return [parsedResponse, fetchRes];
      }, () => {
        throw new JsonRequestError('Failure parsing JSON', fetchRes);
      });
    } else {
      throw new JsonRequestError('Request failed', fetchRes);
    }
  });
}
let canVGrowWithinCell;
function getCanVGrowWithinCell() {
  if (canVGrowWithinCell == null) {
    canVGrowWithinCell = computeCanVGrowWithinCell();
  }
  return canVGrowWithinCell;
}
function computeCanVGrowWithinCell() {
  // for SSR, because this function is call immediately at top-level
  // TODO: just make this logic execute top-level, immediately, instead of doing lazily
  if (typeof document === 'undefined') {
    return true;
  }
  let el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.top = '0px';
  el.style.left = '0px';
  el.innerHTML = '<table><tr><td><div></div></td></tr></table>';
  el.querySelector('table').style.height = '100px';
  el.querySelector('div').style.height = '100%';
  document.body.appendChild(el);
  let div = el.querySelector('div');
  let possible = div.offsetHeight > 0;
  document.body.removeChild(el);
  return possible;
}
class CalendarRoot extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      forPrint: false
    };
    this.handleBeforePrint = () => {
      flushSync(() => {
        this.setState({
          forPrint: true
        });
      });
    };
    this.handleAfterPrint = () => {
      flushSync(() => {
        this.setState({
          forPrint: false
        });
      });
    };
  }
  render() {
    let {
      props
    } = this;
    let {
      options
    } = props;
    let {
      forPrint
    } = this.state;
    let isHeightAuto = forPrint || options.height === 'auto' || options.contentHeight === 'auto';
    let height = !isHeightAuto && options.height != null ? options.height : '';
    let classNames = ['fc', forPrint ? 'fc-media-print' : 'fc-media-screen', `fc-direction-${options.direction}`, props.theme.getClass('root')];
    if (!getCanVGrowWithinCell()) {
      classNames.push('fc-liquid-hack');
    }
    return props.children(classNames, height, isHeightAuto, forPrint);
  }
  componentDidMount() {
    let {
      emitter
    } = this.props;
    emitter.on('_beforeprint', this.handleBeforePrint);
    emitter.on('_afterprint', this.handleAfterPrint);
  }
  componentWillUnmount() {
    let {
      emitter
    } = this.props;
    emitter.off('_beforeprint', this.handleBeforePrint);
    emitter.off('_afterprint', this.handleAfterPrint);
  }
}
class Interaction {
  constructor(settings) {
    this.component = settings.component;
    this.isHitComboAllowed = settings.isHitComboAllowed || null;
  }
  destroy() {}
}
function parseInteractionSettings(component, input) {
  return {
    component,
    el: input.el,
    useEventCenter: input.useEventCenter != null ? input.useEventCenter : true,
    isHitComboAllowed: input.isHitComboAllowed || null
  };
}
function interactionSettingsToStore(settings) {
  return {
    [settings.component.uid]: settings
  };
}
// global state
const interactionSettingsStore = {};
class CalendarImpl {
  getCurrentData() {
    return this.currentDataManager.getCurrentData();
  }
  dispatch(action) {
    this.currentDataManager.dispatch(action);
  }
  get view() {
    return this.getCurrentData().viewApi;
  }
  batchRendering(callback) {
    callback();
  }
  updateSize() {
    this.trigger('_resize', true);
  }
  // Options
  // -----------------------------------------------------------------------------------------------------------------
  setOption(name, val) {
    this.dispatch({
      type: 'SET_OPTION',
      optionName: name,
      rawOptionValue: val
    });
  }
  getOption(name) {
    return this.currentDataManager.currentCalendarOptionsInput[name];
  }
  getAvailableLocaleCodes() {
    return Object.keys(this.getCurrentData().availableRawLocales);
  }
  // Trigger
  // -----------------------------------------------------------------------------------------------------------------
  on(handlerName, handler) {
    let {
      currentDataManager
    } = this;
    if (currentDataManager.currentCalendarOptionsRefiners[handlerName]) {
      currentDataManager.emitter.on(handlerName, handler);
    } else {
      console.warn(`Unknown listener name '${handlerName}'`);
    }
  }
  off(handlerName, handler) {
    this.currentDataManager.emitter.off(handlerName, handler);
  }
  // not meant for public use
  trigger(handlerName, ...args) {
    this.currentDataManager.emitter.trigger(handlerName, ...args);
  }
  // View
  // -----------------------------------------------------------------------------------------------------------------
  changeView(viewType, dateOrRange) {
    this.batchRendering(() => {
      this.unselect();
      if (dateOrRange) {
        if (dateOrRange.start && dateOrRange.end) {
          // a range
          this.dispatch({
            type: 'CHANGE_VIEW_TYPE',
            viewType
          });
          this.dispatch({
            type: 'SET_OPTION',
            optionName: 'visibleRange',
            rawOptionValue: dateOrRange
          });
        } else {
          let {
            dateEnv
          } = this.getCurrentData();
          this.dispatch({
            type: 'CHANGE_VIEW_TYPE',
            viewType,
            dateMarker: dateEnv.createMarker(dateOrRange)
          });
        }
      } else {
        this.dispatch({
          type: 'CHANGE_VIEW_TYPE',
          viewType
        });
      }
    });
  }
  // Forces navigation to a view for the given date.
  // `viewType` can be a specific view name or a generic one like "week" or "day".
  // needs to change
  zoomTo(dateMarker, viewType) {
    let state = this.getCurrentData();
    let spec;
    viewType = viewType || 'day'; // day is default zoom
    spec = state.viewSpecs[viewType] || this.getUnitViewSpec(viewType);
    this.unselect();
    if (spec) {
      this.dispatch({
        type: 'CHANGE_VIEW_TYPE',
        viewType: spec.type,
        dateMarker
      });
    } else {
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker
      });
    }
  }
  // Given a duration singular unit, like "week" or "day", finds a matching view spec.
  // Preference is given to views that have corresponding buttons.
  getUnitViewSpec(unit) {
    let {
      viewSpecs,
      toolbarConfig
    } = this.getCurrentData();
    let viewTypes = [].concat(toolbarConfig.header ? toolbarConfig.header.viewsWithButtons : [], toolbarConfig.footer ? toolbarConfig.footer.viewsWithButtons : []);
    let i;
    let spec;
    for (let viewType in viewSpecs) {
      viewTypes.push(viewType);
    }
    for (i = 0; i < viewTypes.length; i += 1) {
      spec = viewSpecs[viewTypes[i]];
      if (spec) {
        if (spec.singleUnit === unit) {
          return spec;
        }
      }
    }
    return null;
  }
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  prev() {
    this.unselect();
    this.dispatch({
      type: 'PREV'
    });
  }
  next() {
    this.unselect();
    this.dispatch({
      type: 'NEXT'
    });
  }
  prevYear() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.addYears(state.currentDate, -1)
    });
  }
  nextYear() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.addYears(state.currentDate, 1)
    });
  }
  today() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: getNow(state.calendarOptions.now, state.dateEnv)
    });
  }
  gotoDate(zonedDateInput) {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.createMarker(zonedDateInput)
    });
  }
  incrementDate(deltaInput) {
    let state = this.getCurrentData();
    let delta = createDuration(deltaInput);
    if (delta) {
      // else, warn about invalid input?
      this.unselect();
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: state.dateEnv.add(state.currentDate, delta)
      });
    }
  }
  getDate() {
    let state = this.getCurrentData();
    return state.dateEnv.toDate(state.currentDate);
  }
  // Date Formatting Utils
  // -----------------------------------------------------------------------------------------------------------------
  formatDate(d, formatter) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(d0, d1, settings) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings), settings);
  }
  formatIso(d, omitTime) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.formatIso(dateEnv.createMarker(d), {
      omitTime
    });
  }
  // Date Selection / Event Selection / DayClick
  // -----------------------------------------------------------------------------------------------------------------
  select(dateOrObj, endDate) {
    let selectionInput;
    if (endDate == null) {
      if (dateOrObj.start != null) {
        selectionInput = dateOrObj;
      } else {
        selectionInput = {
          start: dateOrObj,
          end: null
        };
      }
    } else {
      selectionInput = {
        start: dateOrObj,
        end: endDate
      };
    }
    let state = this.getCurrentData();
    let selection = parseDateSpan(selectionInput, state.dateEnv, createDuration({
      days: 1
    }));
    if (selection) {
      // throw parse error otherwise?
      this.dispatch({
        type: 'SELECT_DATES',
        selection
      });
      triggerDateSelect(selection, null, state);
    }
  }
  unselect(pev) {
    let state = this.getCurrentData();
    if (state.dateSelection) {
      this.dispatch({
        type: 'UNSELECT_DATES'
      });
      triggerDateUnselect(pev, state);
    }
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(eventInput, sourceInput) {
    if (eventInput instanceof EventImpl) {
      let def = eventInput._def;
      let instance = eventInput._instance;
      let currentData = this.getCurrentData();
      // not already present? don't want to add an old snapshot
      if (!currentData.eventStore.defs[def.defId]) {
        this.dispatch({
          type: 'ADD_EVENTS',
          eventStore: eventTupleToStore({
            def,
            instance
          }) // TODO: better util for two args?
        });
        this.triggerEventAdd(eventInput);
      }
      return eventInput;
    }
    let state = this.getCurrentData();
    let eventSource;
    if (sourceInput instanceof EventSourceImpl) {
      eventSource = sourceInput.internalEventSource;
    } else if (typeof sourceInput === 'boolean') {
      if (sourceInput) {
        // true. part of the first event source
        [eventSource] = hashValuesToArray(state.eventSources);
      }
    } else if (sourceInput != null) {
      // an ID. accepts a number too
      let sourceApi = this.getEventSourceById(sourceInput); // TODO: use an internal function
      if (!sourceApi) {
        console.warn(`Could not find an event source with ID "${sourceInput}"`); // TODO: test
        return null;
      }
      eventSource = sourceApi.internalEventSource;
    }
    let tuple = parseEvent(eventInput, eventSource, state, false);
    if (tuple) {
      let newEventApi = new EventImpl(state, tuple.def, tuple.def.recurringDef ? null : tuple.instance);
      this.dispatch({
        type: 'ADD_EVENTS',
        eventStore: eventTupleToStore(tuple)
      });
      this.triggerEventAdd(newEventApi);
      return newEventApi;
    }
    return null;
  }
  triggerEventAdd(eventApi) {
    let {
      emitter
    } = this.getCurrentData();
    emitter.trigger('eventAdd', {
      event: eventApi,
      relatedEvents: [],
      revert: () => {
        this.dispatch({
          type: 'REMOVE_EVENTS',
          eventStore: eventApiToStore(eventApi)
        });
      }
    });
  }
  // TODO: optimize
  getEventById(id) {
    let state = this.getCurrentData();
    let {
      defs,
      instances
    } = state.eventStore;
    id = String(id);
    for (let defId in defs) {
      let def = defs[defId];
      if (def.publicId === id) {
        if (def.recurringDef) {
          return new EventImpl(state, def, null);
        }
        for (let instanceId in instances) {
          let instance = instances[instanceId];
          if (instance.defId === def.defId) {
            return new EventImpl(state, def, instance);
          }
        }
      }
    }
    return null;
  }
  getEvents() {
    let currentData = this.getCurrentData();
    return buildEventApis(currentData.eventStore, currentData);
  }
  removeAllEvents() {
    this.dispatch({
      type: 'REMOVE_ALL_EVENTS'
    });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let state = this.getCurrentData();
    let sourceHash = state.eventSources;
    let sourceApis = [];
    for (let internalId in sourceHash) {
      sourceApis.push(new EventSourceImpl(state, sourceHash[internalId]));
    }
    return sourceApis;
  }
  getEventSourceById(id) {
    let state = this.getCurrentData();
    let sourceHash = state.eventSources;
    id = String(id);
    for (let sourceId in sourceHash) {
      if (sourceHash[sourceId].publicId === id) {
        return new EventSourceImpl(state, sourceHash[sourceId]);
      }
    }
    return null;
  }
  addEventSource(sourceInput) {
    let state = this.getCurrentData();
    if (sourceInput instanceof EventSourceImpl) {
      // not already present? don't want to add an old snapshot
      if (!state.eventSources[sourceInput.internalEventSource.sourceId]) {
        this.dispatch({
          type: 'ADD_EVENT_SOURCES',
          sources: [sourceInput.internalEventSource]
        });
      }
      return sourceInput;
    }
    let eventSource = parseEventSource(sourceInput, state);
    if (eventSource) {
      // TODO: error otherwise?
      this.dispatch({
        type: 'ADD_EVENT_SOURCES',
        sources: [eventSource]
      });
      return new EventSourceImpl(state, eventSource);
    }
    return null;
  }
  removeAllEventSources() {
    this.dispatch({
      type: 'REMOVE_ALL_EVENT_SOURCES'
    });
  }
  refetchEvents() {
    this.dispatch({
      type: 'FETCH_EVENT_SOURCES',
      isRefetch: true
    });
  }
  // Scroll
  // -----------------------------------------------------------------------------------------------------------------
  scrollToTime(timeInput) {
    let time = createDuration(timeInput);
    if (time) {
      this.trigger('_scrollRequest', {
        time
      });
    }
  }
}
function pointInsideRect(point, rect) {
  return point.left >= rect.left && point.left < rect.right && point.top >= rect.top && point.top < rect.bottom;
}
// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
  let res = {
    left: Math.max(rect1.left, rect2.left),
    right: Math.min(rect1.right, rect2.right),
    top: Math.max(rect1.top, rect2.top),
    bottom: Math.min(rect1.bottom, rect2.bottom)
  };
  if (res.left < res.right && res.top < res.bottom) {
    return res;
  }
  return false;
}
function translateRect(rect, deltaX, deltaY) {
  return {
    left: rect.left + deltaX,
    right: rect.right + deltaX,
    top: rect.top + deltaY,
    bottom: rect.bottom + deltaY
  };
}
// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
  return {
    left: Math.min(Math.max(point.left, rect.left), rect.right),
    top: Math.min(Math.max(point.top, rect.top), rect.bottom)
  };
}
// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
  return {
    left: (rect.left + rect.right) / 2,
    top: (rect.top + rect.bottom) / 2
  };
}
// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
  return {
    left: point1.left - point2.left,
    top: point1.top - point2.top
  };
}
const EMPTY_EVENT_STORE = createEmptyEventStore(); // for purecomponents. TODO: keep elsewhere
class Splitter {
  constructor() {
    this.getKeysForEventDefs = memoize(this._getKeysForEventDefs);
    this.splitDateSelection = memoize(this._splitDateSpan);
    this.splitEventStore = memoize(this._splitEventStore);
    this.splitIndividualUi = memoize(this._splitIndividualUi);
    this.splitEventDrag = memoize(this._splitInteraction);
    this.splitEventResize = memoize(this._splitInteraction);
    this.eventUiBuilders = {}; // TODO: typescript protection
  }
  splitProps(props) {
    let keyInfos = this.getKeyInfo(props);
    let defKeys = this.getKeysForEventDefs(props.eventStore);
    let dateSelections = this.splitDateSelection(props.dateSelection);
    let individualUi = this.splitIndividualUi(props.eventUiBases, defKeys); // the individual *bases*
    let eventStores = this.splitEventStore(props.eventStore, defKeys);
    let eventDrags = this.splitEventDrag(props.eventDrag);
    let eventResizes = this.splitEventResize(props.eventResize);
    let splitProps = {};
    this.eventUiBuilders = mapHash(keyInfos, (info, key) => this.eventUiBuilders[key] || memoize(buildEventUiForKey));
    for (let key in keyInfos) {
      let keyInfo = keyInfos[key];
      let eventStore = eventStores[key] || EMPTY_EVENT_STORE;
      let buildEventUi = this.eventUiBuilders[key];
      splitProps[key] = {
        businessHours: keyInfo.businessHours || props.businessHours,
        dateSelection: dateSelections[key] || null,
        eventStore,
        eventUiBases: buildEventUi(props.eventUiBases[''], keyInfo.ui, individualUi[key]),
        eventSelection: eventStore.instances[props.eventSelection] ? props.eventSelection : '',
        eventDrag: eventDrags[key] || null,
        eventResize: eventResizes[key] || null
      };
    }
    return splitProps;
  }
  _splitDateSpan(dateSpan) {
    let dateSpans = {};
    if (dateSpan) {
      let keys = this.getKeysForDateSpan(dateSpan);
      for (let key of keys) {
        dateSpans[key] = dateSpan;
      }
    }
    return dateSpans;
  }
  _getKeysForEventDefs(eventStore) {
    return mapHash(eventStore.defs, eventDef => this.getKeysForEventDef(eventDef));
  }
  _splitEventStore(eventStore, defKeys) {
    let {
      defs,
      instances
    } = eventStore;
    let splitStores = {};
    for (let defId in defs) {
      for (let key of defKeys[defId]) {
        if (!splitStores[key]) {
          splitStores[key] = createEmptyEventStore();
        }
        splitStores[key].defs[defId] = defs[defId];
      }
    }
    for (let instanceId in instances) {
      let instance = instances[instanceId];
      for (let key of defKeys[instance.defId]) {
        if (splitStores[key]) {
          // must have already been created
          splitStores[key].instances[instanceId] = instance;
        }
      }
    }
    return splitStores;
  }
  _splitIndividualUi(eventUiBases, defKeys) {
    let splitHashes = {};
    for (let defId in eventUiBases) {
      if (defId) {
        // not the '' key
        for (let key of defKeys[defId]) {
          if (!splitHashes[key]) {
            splitHashes[key] = {};
          }
          splitHashes[key][defId] = eventUiBases[defId];
        }
      }
    }
    return splitHashes;
  }
  _splitInteraction(interaction) {
    let splitStates = {};
    if (interaction) {
      let affectedStores = this._splitEventStore(interaction.affectedEvents, this._getKeysForEventDefs(interaction.affectedEvents));
      // can't rely on defKeys because event data is mutated
      let mutatedKeysByDefId = this._getKeysForEventDefs(interaction.mutatedEvents);
      let mutatedStores = this._splitEventStore(interaction.mutatedEvents, mutatedKeysByDefId);
      let populate = key => {
        if (!splitStates[key]) {
          splitStates[key] = {
            affectedEvents: affectedStores[key] || EMPTY_EVENT_STORE,
            mutatedEvents: mutatedStores[key] || EMPTY_EVENT_STORE,
            isEvent: interaction.isEvent
          };
        }
      };
      for (let key in affectedStores) {
        populate(key);
      }
      for (let key in mutatedStores) {
        populate(key);
      }
    }
    return splitStates;
  }
}
function buildEventUiForKey(allUi, eventUiForKey, individualUi) {
  let baseParts = [];
  if (allUi) {
    baseParts.push(allUi);
  }
  if (eventUiForKey) {
    baseParts.push(eventUiForKey);
  }
  let stuff = {
    '': combineEventUis(baseParts)
  };
  if (individualUi) {
    Object.assign(stuff, individualUi);
  }
  return stuff;
}
function getDateMeta(date, todayRange, nowDate, dateProfile) {
  return {
    dow: date.getUTCDay(),
    isDisabled: Boolean(dateProfile && !rangeContainsMarker(dateProfile.activeRange, date)),
    isOther: Boolean(dateProfile && !rangeContainsMarker(dateProfile.currentRange, date)),
    isToday: Boolean(todayRange && rangeContainsMarker(todayRange, date)),
    isPast: Boolean(nowDate ? date < nowDate : todayRange ? date < todayRange.start : false),
    isFuture: Boolean(nowDate ? date > nowDate : todayRange ? date >= todayRange.end : false)
  };
}
function getDayClassNames(meta, theme) {
  let classNames = ['fc-day', `fc-day-${DAY_IDS[meta.dow]}`];
  if (meta.isDisabled) {
    classNames.push('fc-day-disabled');
  } else {
    if (meta.isToday) {
      classNames.push('fc-day-today');
      classNames.push(theme.getClass('today'));
    }
    if (meta.isPast) {
      classNames.push('fc-day-past');
    }
    if (meta.isFuture) {
      classNames.push('fc-day-future');
    }
    if (meta.isOther) {
      classNames.push('fc-day-other');
    }
  }
  return classNames;
}
function getSlotClassNames(meta, theme) {
  let classNames = ['fc-slot', `fc-slot-${DAY_IDS[meta.dow]}`];
  if (meta.isDisabled) {
    classNames.push('fc-slot-disabled');
  } else {
    if (meta.isToday) {
      classNames.push('fc-slot-today');
      classNames.push(theme.getClass('today'));
    }
    if (meta.isPast) {
      classNames.push('fc-slot-past');
    }
    if (meta.isFuture) {
      classNames.push('fc-slot-future');
    }
  }
  return classNames;
}
const DAY_FORMAT = createFormatter({
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const WEEK_FORMAT = createFormatter({
  week: 'long'
});
function buildNavLinkAttrs(context, dateMarker, viewType = 'day', isTabbable = true) {
  const {
    dateEnv,
    options,
    calendarApi
  } = context;
  let dateStr = dateEnv.format(dateMarker, viewType === 'week' ? WEEK_FORMAT : DAY_FORMAT);
  if (options.navLinks) {
    let zonedDate = dateEnv.toDate(dateMarker);
    const handleInteraction = ev => {
      let customAction = viewType === 'day' ? options.navLinkDayClick : viewType === 'week' ? options.navLinkWeekClick : null;
      if (typeof customAction === 'function') {
        customAction.call(calendarApi, dateEnv.toDate(dateMarker), ev);
      } else {
        if (typeof customAction === 'string') {
          viewType = customAction;
        }
        calendarApi.zoomTo(dateMarker, viewType);
      }
    };
    return Object.assign({
      title: formatWithOrdinals(options.navLinkHint, [dateStr, zonedDate], dateStr),
      'data-navlink': ''
    }, isTabbable ? createAriaClickAttrs(handleInteraction) : {
      onClick: handleInteraction
    });
  }
  return {
    'aria-label': dateStr
  };
}
let _isRtlScrollbarOnLeft = null;
function getIsRtlScrollbarOnLeft() {
  if (_isRtlScrollbarOnLeft === null) {
    _isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft();
  }
  return _isRtlScrollbarOnLeft;
}
function computeIsRtlScrollbarOnLeft() {
  let outerEl = document.createElement('div');
  applyStyle(outerEl, {
    position: 'absolute',
    top: -1000,
    left: 0,
    border: 0,
    padding: 0,
    overflow: 'scroll',
    direction: 'rtl'
  });
  outerEl.innerHTML = '<div></div>';
  document.body.appendChild(outerEl);
  let innerEl = outerEl.firstChild;
  let res = innerEl.getBoundingClientRect().left > outerEl.getBoundingClientRect().left;
  removeElement(outerEl);
  return res;
}
let _scrollbarWidths;
function getScrollbarWidths() {
  if (!_scrollbarWidths) {
    _scrollbarWidths = computeScrollbarWidths();
  }
  return _scrollbarWidths;
}
function computeScrollbarWidths() {
  let el = document.createElement('div');
  el.style.overflow = 'scroll';
  el.style.position = 'absolute';
  el.style.top = '-9999px';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  let res = computeScrollbarWidthsForEl(el);
  document.body.removeChild(el);
  return res;
}
// WARNING: will include border
function computeScrollbarWidthsForEl(el) {
  return {
    x: el.offsetHeight - el.clientHeight,
    y: el.offsetWidth - el.clientWidth
  };
}
function computeEdges(el, getPadding = false) {
  let computedStyle = window.getComputedStyle(el);
  let borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0;
  let borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0;
  let borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
  let borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
  let badScrollbarWidths = computeScrollbarWidthsForEl(el); // includes border!
  let scrollbarLeftRight = badScrollbarWidths.y - borderLeft - borderRight;
  let scrollbarBottom = badScrollbarWidths.x - borderTop - borderBottom;
  let res = {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    scrollbarBottom,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') {
    // is the scrollbar on the left side?
    res.scrollbarLeft = scrollbarLeftRight;
  } else {
    res.scrollbarRight = scrollbarLeftRight;
  }
  if (getPadding) {
    res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
    res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
    res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
    res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
  }
  return res;
}
function computeInnerRect(el, goWithinPadding = false, doFromWindowViewport) {
  let outerRect = doFromWindowViewport ? el.getBoundingClientRect() : computeRect(el);
  let edges = computeEdges(el, goWithinPadding);
  let res = {
    left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
    right: outerRect.right - edges.borderRight - edges.scrollbarRight,
    top: outerRect.top + edges.borderTop,
    bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom
  };
  if (goWithinPadding) {
    res.left += edges.paddingLeft;
    res.right -= edges.paddingRight;
    res.top += edges.paddingTop;
    res.bottom -= edges.paddingBottom;
  }
  return res;
}
function computeRect(el) {
  let rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY
  };
}
function computeClippedClientRect(el) {
  let clippingParents = getClippingParents(el);
  let rect = el.getBoundingClientRect();
  for (let clippingParent of clippingParents) {
    let intersection = intersectRects(rect, clippingParent.getBoundingClientRect());
    if (intersection) {
      rect = intersection;
    } else {
      return null;
    }
  }
  return rect;
}
// does not return window
function getClippingParents(el) {
  let parents = [];
  while (el instanceof HTMLElement) {
    // will stop when gets to document or null
    let computedStyle = window.getComputedStyle(el);
    if (computedStyle.position === 'fixed') {
      break;
    }
    if (/(auto|scroll)/.test(computedStyle.overflow + computedStyle.overflowY + computedStyle.overflowX)) {
      parents.push(el);
    }
    el = el.parentNode;
  }
  return parents;
}

/*
Records offset information for a set of elements, relative to an origin element.
Can record the left/right OR the top/bottom OR both.
Provides methods for querying the cache by position.
*/
class PositionCache {
  constructor(originEl, els, isHorizontal, isVertical) {
    this.els = els;
    let originClientRect = this.originClientRect = originEl.getBoundingClientRect(); // relative to viewport top-left
    if (isHorizontal) {
      this.buildElHorizontals(originClientRect.left);
    }
    if (isVertical) {
      this.buildElVerticals(originClientRect.top);
    }
  }
  // Populates the left/right internal coordinate arrays
  buildElHorizontals(originClientLeft) {
    let lefts = [];
    let rights = [];
    for (let el of this.els) {
      let rect = el.getBoundingClientRect();
      lefts.push(rect.left - originClientLeft);
      rights.push(rect.right - originClientLeft);
    }
    this.lefts = lefts;
    this.rights = rights;
  }
  // Populates the top/bottom internal coordinate arrays
  buildElVerticals(originClientTop) {
    let tops = [];
    let bottoms = [];
    for (let el of this.els) {
      let rect = el.getBoundingClientRect();
      tops.push(rect.top - originClientTop);
      bottoms.push(rect.bottom - originClientTop);
    }
    this.tops = tops;
    this.bottoms = bottoms;
  }
  // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
  // If no intersection is made, returns undefined.
  leftToIndex(leftPosition) {
    let {
      lefts,
      rights
    } = this;
    let len = lefts.length;
    let i;
    for (i = 0; i < len; i += 1) {
      if (leftPosition >= lefts[i] && leftPosition < rights[i]) {
        return i;
      }
    }
    return undefined; // TODO: better
  }
  // Given a top offset (from document top), returns the index of the el that it vertically intersects.
  // If no intersection is made, returns undefined.
  topToIndex(topPosition) {
    let {
      tops,
      bottoms
    } = this;
    let len = tops.length;
    let i;
    for (i = 0; i < len; i += 1) {
      if (topPosition >= tops[i] && topPosition < bottoms[i]) {
        return i;
      }
    }
    return undefined; // TODO: better
  }
  // Gets the width of the element at the given index
  getWidth(leftIndex) {
    return this.rights[leftIndex] - this.lefts[leftIndex];
  }
  // Gets the height of the element at the given index
  getHeight(topIndex) {
    return this.bottoms[topIndex] - this.tops[topIndex];
  }
  similarTo(otherCache) {
    return similarNumArrays(this.tops || [], otherCache.tops || []) && similarNumArrays(this.bottoms || [], otherCache.bottoms || []) && similarNumArrays(this.lefts || [], otherCache.lefts || []) && similarNumArrays(this.rights || [], otherCache.rights || []);
  }
}
function similarNumArrays(a, b) {
  const len = a.length;
  if (len !== b.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (Math.round(a[i]) !== Math.round(b[i])) {
      return false;
    }
  }
  return true;
}

/* eslint max-classes-per-file: "off" */
/*
An object for getting/setting scroll-related information for an element.
Internally, this is done very differently for window versus DOM element,
so this object serves as a common interface.
*/
class ScrollController {
  getMaxScrollTop() {
    return this.getScrollHeight() - this.getClientHeight();
  }
  getMaxScrollLeft() {
    return this.getScrollWidth() - this.getClientWidth();
  }
  canScrollVertically() {
    return this.getMaxScrollTop() > 0;
  }
  canScrollHorizontally() {
    return this.getMaxScrollLeft() > 0;
  }
  canScrollUp() {
    return this.getScrollTop() > 0;
  }
  canScrollDown() {
    return this.getScrollTop() < this.getMaxScrollTop();
  }
  canScrollLeft() {
    return this.getScrollLeft() > 0;
  }
  canScrollRight() {
    return this.getScrollLeft() < this.getMaxScrollLeft();
  }
}
class ElementScrollController extends ScrollController {
  constructor(el) {
    super();
    this.el = el;
  }
  getScrollTop() {
    return this.el.scrollTop;
  }
  getScrollLeft() {
    return this.el.scrollLeft;
  }
  setScrollTop(top) {
    this.el.scrollTop = top;
  }
  setScrollLeft(left) {
    this.el.scrollLeft = left;
  }
  getScrollWidth() {
    return this.el.scrollWidth;
  }
  getScrollHeight() {
    return this.el.scrollHeight;
  }
  getClientHeight() {
    return this.el.clientHeight;
  }
  getClientWidth() {
    return this.el.clientWidth;
  }
}
class WindowScrollController extends ScrollController {
  getScrollTop() {
    return window.scrollY;
  }
  getScrollLeft() {
    return window.scrollX;
  }
  setScrollTop(n) {
    window.scroll(window.scrollX, n);
  }
  setScrollLeft(n) {
    window.scroll(n, window.scrollY);
  }
  getScrollWidth() {
    return document.documentElement.scrollWidth;
  }
  getScrollHeight() {
    return document.documentElement.scrollHeight;
  }
  getClientHeight() {
    return document.documentElement.clientHeight;
  }
  getClientWidth() {
    return document.documentElement.clientWidth;
  }
}

/*
an INTERACTABLE date component

PURPOSES:
- hook up to fg, fill, and mirror renderers
- interface for dragging and hits
*/
class DateComponent extends BaseComponent {
  constructor() {
    super(...arguments);
    this.uid = guid();
  }
  // Hit System
  // -----------------------------------------------------------------------------------------------------------------
  prepareHits() {}
  queryHit(positionLeft, positionTop, elWidth, elHeight) {
    return null; // this should be abstract
  }
  // Pointer Interaction Utils
  // -----------------------------------------------------------------------------------------------------------------
  isValidSegDownEl(el) {
    return !this.props.eventDrag &&
    // HACK
    !this.props.eventResize &&
    // HACK
    !elementClosest(el, '.fc-event-mirror');
  }
  isValidDateDownEl(el) {
    return !elementClosest(el, '.fc-event:not(.fc-bg-event)') && !elementClosest(el, '.fc-more-link') &&
    // a "more.." link
    !elementClosest(el, 'a[data-navlink]') &&
    // a clickable nav link
    !elementClosest(el, '.fc-popover'); // hack
  }
}
class NamedTimeZoneImpl {
  constructor(timeZoneName) {
    this.timeZoneName = timeZoneName;
  }
}
class SegHierarchy {
  constructor(getEntryThickness = entry => {
    // if no thickness known, assume 1 (if 0, so small it always fits)
    return entry.thickness || 1;
  }) {
    this.getEntryThickness = getEntryThickness;
    // settings
    this.strictOrder = false;
    this.allowReslicing = false;
    this.maxCoord = -1; // -1 means no max
    this.maxStackCnt = -1; // -1 means no max
    this.levelCoords = []; // ordered
    this.entriesByLevel = []; // parallel with levelCoords
    this.stackCnts = {}; // TODO: use better technique!?
  }
  addSegs(inputs) {
    let hiddenEntries = [];
    for (let input of inputs) {
      this.insertEntry(input, hiddenEntries);
    }
    return hiddenEntries;
  }
  insertEntry(entry, hiddenEntries) {
    let insertion = this.findInsertion(entry);
    if (this.isInsertionValid(insertion, entry)) {
      this.insertEntryAt(entry, insertion);
    } else {
      this.handleInvalidInsertion(insertion, entry, hiddenEntries);
    }
  }
  isInsertionValid(insertion, entry) {
    return (this.maxCoord === -1 || insertion.levelCoord + this.getEntryThickness(entry) <= this.maxCoord) && (this.maxStackCnt === -1 || insertion.stackCnt < this.maxStackCnt);
  }
  handleInvalidInsertion(insertion, entry, hiddenEntries) {
    if (this.allowReslicing && insertion.touchingEntry) {
      const hiddenEntry = Object.assign(Object.assign({}, entry), {
        span: intersectSpans(entry.span, insertion.touchingEntry.span)
      });
      hiddenEntries.push(hiddenEntry);
      this.splitEntry(entry, insertion.touchingEntry, hiddenEntries);
    } else {
      hiddenEntries.push(entry);
    }
  }
  /*
  Does NOT add what hit the `barrier` into hiddenEntries. Should already be done.
  */
  splitEntry(entry, barrier, hiddenEntries) {
    let entrySpan = entry.span;
    let barrierSpan = barrier.span;
    if (entrySpan.start < barrierSpan.start) {
      this.insertEntry({
        index: entry.index,
        thickness: entry.thickness,
        span: {
          start: entrySpan.start,
          end: barrierSpan.start
        }
      }, hiddenEntries);
    }
    if (entrySpan.end > barrierSpan.end) {
      this.insertEntry({
        index: entry.index,
        thickness: entry.thickness,
        span: {
          start: barrierSpan.end,
          end: entrySpan.end
        }
      }, hiddenEntries);
    }
  }
  insertEntryAt(entry, insertion) {
    let {
      entriesByLevel,
      levelCoords
    } = this;
    if (insertion.lateral === -1) {
      // create a new level
      insertAt(levelCoords, insertion.level, insertion.levelCoord);
      insertAt(entriesByLevel, insertion.level, [entry]);
    } else {
      // insert into existing level
      insertAt(entriesByLevel[insertion.level], insertion.lateral, entry);
    }
    this.stackCnts[buildEntryKey(entry)] = insertion.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(newEntry) {
    let {
      levelCoords,
      entriesByLevel,
      strictOrder,
      stackCnts
    } = this;
    let levelCnt = levelCoords.length;
    let candidateCoord = 0;
    let touchingLevel = -1;
    let touchingLateral = -1;
    let touchingEntry = null;
    let stackCnt = 0;
    for (let trackingLevel = 0; trackingLevel < levelCnt; trackingLevel += 1) {
      const trackingCoord = levelCoords[trackingLevel];
      // if the current level is past the placed entry, we have found a good empty space and can stop.
      // if strictOrder, keep finding more lateral intersections.
      if (!strictOrder && trackingCoord >= candidateCoord + this.getEntryThickness(newEntry)) {
        break;
      }
      let trackingEntries = entriesByLevel[trackingLevel];
      let trackingEntry;
      let searchRes = binarySearch(trackingEntries, newEntry.span.start, getEntrySpanEnd); // find first entry after newEntry's end
      let lateralIndex = searchRes[0] + searchRes[1]; // if exact match (which doesn't collide), go to next one
      while (
      // loop through entries that horizontally intersect
      (trackingEntry = trackingEntries[lateralIndex]) &&
      // but not past the whole entry list
      trackingEntry.span.start < newEntry.span.end // and not entirely past newEntry
      ) {
        let trackingEntryBottom = trackingCoord + this.getEntryThickness(trackingEntry);
        // intersects into the top of the candidate?
        if (trackingEntryBottom > candidateCoord) {
          candidateCoord = trackingEntryBottom;
          touchingEntry = trackingEntry;
          touchingLevel = trackingLevel;
          touchingLateral = lateralIndex;
        }
        // butts up against top of candidate? (will happen if just intersected as well)
        if (trackingEntryBottom === candidateCoord) {
          // accumulate the highest possible stackCnt of the trackingEntries that butt up
          stackCnt = Math.max(stackCnt, stackCnts[buildEntryKey(trackingEntry)] + 1);
        }
        lateralIndex += 1;
      }
    }
    // the destination level will be after touchingEntry's level. find it
    let destLevel = 0;
    if (touchingEntry) {
      destLevel = touchingLevel + 1;
      while (destLevel < levelCnt && levelCoords[destLevel] < candidateCoord) {
        destLevel += 1;
      }
    }
    // if adding to an existing level, find where to insert
    let destLateral = -1;
    if (destLevel < levelCnt && levelCoords[destLevel] === candidateCoord) {
      destLateral = binarySearch(entriesByLevel[destLevel], newEntry.span.end, getEntrySpanEnd)[0];
    }
    return {
      touchingLevel,
      touchingLateral,
      touchingEntry,
      stackCnt,
      levelCoord: candidateCoord,
      level: destLevel,
      lateral: destLateral
    };
  }
  // sorted by levelCoord (lowest to highest)
  toRects() {
    let {
      entriesByLevel,
      levelCoords
    } = this;
    let levelCnt = entriesByLevel.length;
    let rects = [];
    for (let level = 0; level < levelCnt; level += 1) {
      let entries = entriesByLevel[level];
      let levelCoord = levelCoords[level];
      for (let entry of entries) {
        rects.push(Object.assign(Object.assign({}, entry), {
          thickness: this.getEntryThickness(entry),
          levelCoord
        }));
      }
    }
    return rects;
  }
}
function getEntrySpanEnd(entry) {
  return entry.span.end;
}
function buildEntryKey(entry) {
  return entry.index + ':' + entry.span.start;
}
// returns groups with entries sorted by input order
function groupIntersectingEntries(entries) {
  let merges = [];
  for (let entry of entries) {
    let filteredMerges = [];
    let hungryMerge = {
      span: entry.span,
      entries: [entry]
    };
    for (let merge of merges) {
      if (intersectSpans(merge.span, hungryMerge.span)) {
        hungryMerge = {
          entries: merge.entries.concat(hungryMerge.entries),
          span: joinSpans(merge.span, hungryMerge.span)
        };
      } else {
        filteredMerges.push(merge);
      }
    }
    filteredMerges.push(hungryMerge);
    merges = filteredMerges;
  }
  return merges;
}
function joinSpans(span0, span1) {
  return {
    start: Math.min(span0.start, span1.start),
    end: Math.max(span0.end, span1.end)
  };
}
function intersectSpans(span0, span1) {
  let start = Math.max(span0.start, span1.start);
  let end = Math.min(span0.end, span1.end);
  if (start < end) {
    return {
      start,
      end
    };
  }
  return null;
}
// general util
// ---------------------------------------------------------------------------------------------------------------------
function insertAt(arr, index, item) {
  arr.splice(index, 0, item);
}
function binarySearch(a, searchVal, getItemVal) {
  let startIndex = 0;
  let endIndex = a.length; // exclusive
  if (!endIndex || searchVal < getItemVal(a[startIndex])) {
    // no items OR before first item
    return [0, 0];
  }
  if (searchVal > getItemVal(a[endIndex - 1])) {
    // after last item
    return [endIndex, 0];
  }
  while (startIndex < endIndex) {
    let middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
    let middleVal = getItemVal(a[middleIndex]);
    if (searchVal < middleVal) {
      endIndex = middleIndex;
    } else if (searchVal > middleVal) {
      startIndex = middleIndex + 1;
    } else {
      // equal!
      return [middleIndex, 1];
    }
  }
  return [startIndex, 0];
}

/*
An abstraction for a dragging interaction originating on an event.
Does higher-level things than PointerDragger, such as possibly:
- a "mirror" that moves with the pointer
- a minimum number of pixels or other criteria for a true drag to begin

subclasses must emit:
- pointerdown
- dragstart
- dragmove
- pointerup
- dragend
*/
class ElementDragging {
  constructor(el, selector) {
    this.emitter = new Emitter();
  }
  destroy() {}
  setMirrorIsVisible(bool) {
    // optional if subclass doesn't want to support a mirror
  }
  setMirrorNeedsRevert(bool) {
    // optional if subclass doesn't want to support a mirror
  }
  setAutoScrollEnabled(bool) {
    // optional
  }
}

// TODO: get rid of this in favor of options system,
// tho it's really easy to access this globally rather than pass thru options.
const config = {};

/*
Information about what will happen when an external element is dragged-and-dropped
onto a calendar. Contains information for creating an event.
*/
const DRAG_META_REFINERS = {
  startTime: createDuration,
  duration: createDuration,
  create: Boolean,
  sourceId: String
};
function parseDragMeta(raw) {
  let {
    refined,
    extra
  } = refineProps(raw, DRAG_META_REFINERS);
  return {
    startTime: refined.startTime || null,
    duration: refined.duration || null,
    create: refined.create != null ? refined.create : true,
    sourceId: refined.sourceId,
    leftoverProps: extra
  };
}

// Computes a default column header formatting string if `colFormat` is not explicitly defined
function computeFallbackHeaderFormat(datesRepDistinctDays, dayCnt) {
  // if more than one week row, or if there are a lot of columns with not much space,
  // put just the day numbers will be in each cell
  if (!datesRepDistinctDays || dayCnt > 10) {
    return createFormatter({
      weekday: 'short'
    }); // "Sat"
  }
  if (dayCnt > 1) {
    return createFormatter({
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      omitCommas: true
    }); // "Sat 11/12"
  }
  return createFormatter({
    weekday: 'long'
  }); // "Saturday"
}
const CLASS_NAME = 'fc-col-header-cell'; // do the cushion too? no
function renderInner$1(renderProps) {
  return renderProps.text;
}

// BAD name for this class now. used in the Header
class TableDateCell extends BaseComponent {
  render() {
    let {
      dateEnv,
      options,
      theme,
      viewApi
    } = this.context;
    let {
      props
    } = this;
    let {
      date,
      dateProfile
    } = props;
    let dayMeta = getDateMeta(date, props.todayRange, null, dateProfile);
    let classNames = [CLASS_NAME].concat(getDayClassNames(dayMeta, theme));
    let text = dateEnv.format(date, props.dayHeaderFormat);
    // if colCnt is 1, we are already in a day-view and don't need a navlink
    let navLinkAttrs = !dayMeta.isDisabled && props.colCnt > 1 ? buildNavLinkAttrs(this.context, date) : {};
    let renderProps = Object.assign(Object.assign(Object.assign({
      date: dateEnv.toDate(date),
      view: viewApi
    }, props.extraRenderProps), {
      text
    }), dayMeta);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
      elTag: "th",
      elClasses: classNames,
      elAttrs: Object.assign({
        role: 'columnheader',
        colSpan: props.colSpan,
        'data-date': !dayMeta.isDisabled ? formatDayString(date) : undefined
      }, props.extraDataAttrs),
      renderProps: renderProps,
      generatorName: "dayHeaderContent",
      customGenerator: options.dayHeaderContent,
      defaultGenerator: renderInner$1,
      classNameGenerator: options.dayHeaderClassNames,
      didMount: options.dayHeaderDidMount,
      willUnmount: options.dayHeaderWillUnmount
    }, InnerContainer => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-scrollgrid-sync-inner"
    }, !dayMeta.isDisabled && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContainer, {
      elTag: "a",
      elAttrs: navLinkAttrs,
      elClasses: ['fc-col-header-cell-cushion', props.isSticky && 'fc-sticky']
    })));
  }
}
const WEEKDAY_FORMAT = createFormatter({
  weekday: 'long'
});
class TableDowCell extends BaseComponent {
  render() {
    let {
      props
    } = this;
    let {
      dateEnv,
      theme,
      viewApi,
      options
    } = this.context;
    let date = addDays(new Date(259200000), props.dow); // start with Sun, 04 Jan 1970 00:00:00 GMT
    let dateMeta = {
      dow: props.dow,
      isDisabled: false,
      isFuture: false,
      isPast: false,
      isToday: false,
      isOther: false
    };
    let text = dateEnv.format(date, props.dayHeaderFormat);
    let renderProps = Object.assign(Object.assign(Object.assign(Object.assign({
      // TODO: make this public?
      date
    }, dateMeta), {
      view: viewApi
    }), props.extraRenderProps), {
      text
    });
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
      elTag: "th",
      elClasses: [CLASS_NAME, ...getDayClassNames(dateMeta, theme), ...(props.extraClassNames || [])],
      elAttrs: Object.assign({
        role: 'columnheader',
        colSpan: props.colSpan
      }, props.extraDataAttrs),
      renderProps: renderProps,
      generatorName: "dayHeaderContent",
      customGenerator: options.dayHeaderContent,
      defaultGenerator: renderInner$1,
      classNameGenerator: options.dayHeaderClassNames,
      didMount: options.dayHeaderDidMount,
      willUnmount: options.dayHeaderWillUnmount
    }, InnerContent => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-scrollgrid-sync-inner"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "a",
      elClasses: ['fc-col-header-cell-cushion', props.isSticky && 'fc-sticky'],
      elAttrs: {
        'aria-label': dateEnv.format(date, WEEKDAY_FORMAT)
      }
    })));
  }
}
class NowTimer extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props, context) {
    super(props, context);
    this.initialNowDate = getNow(context.options.now, context.dateEnv);
    this.initialNowQueriedMs = new Date().valueOf();
    this.state = this.computeTiming().currentState;
  }
  render() {
    let {
      props,
      state
    } = this;
    return props.children(state.nowDate, state.todayRange);
  }
  componentDidMount() {
    this.setTimeout();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.unit !== this.props.unit) {
      this.clearTimeout();
      this.setTimeout();
    }
  }
  componentWillUnmount() {
    this.clearTimeout();
  }
  computeTiming() {
    let {
      props,
      context
    } = this;
    let unroundedNow = addMs(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs);
    let currentUnitStart = context.dateEnv.startOf(unroundedNow, props.unit);
    let nextUnitStart = context.dateEnv.add(currentUnitStart, createDuration(1, props.unit));
    let waitMs = nextUnitStart.valueOf() - unroundedNow.valueOf();
    // there is a max setTimeout ms value (https://stackoverflow.com/a/3468650/96342)
    // ensure no longer than a day
    waitMs = Math.min(1000 * 60 * 60 * 24, waitMs);
    return {
      currentState: {
        nowDate: currentUnitStart,
        todayRange: buildDayRange(currentUnitStart)
      },
      nextState: {
        nowDate: nextUnitStart,
        todayRange: buildDayRange(nextUnitStart)
      },
      waitMs
    };
  }
  setTimeout() {
    let {
      nextState,
      waitMs
    } = this.computeTiming();
    this.timeoutId = setTimeout(() => {
      this.setState(nextState, () => {
        this.setTimeout();
      });
    }, waitMs);
  }
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
NowTimer.contextType = ViewContextType;
function buildDayRange(date) {
  let start = startOfDay(date);
  let end = addDays(start, 1);
  return {
    start,
    end
  };
}
class DayHeader extends BaseComponent {
  constructor() {
    super(...arguments);
    this.createDayHeaderFormatter = memoize(createDayHeaderFormatter);
  }
  render() {
    let {
      context
    } = this;
    let {
      dates,
      dateProfile,
      datesRepDistinctDays,
      renderIntro
    } = this.props;
    let dayHeaderFormat = this.createDayHeaderFormatter(context.options.dayHeaderFormat, datesRepDistinctDays, dates.length);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(NowTimer, {
      unit: "day"
    }, (nowDate, todayRange) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      role: "row"
    }, renderIntro && renderIntro('day'), dates.map(date => datesRepDistinctDays ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableDateCell, {
      key: date.toISOString(),
      date: date,
      dateProfile: dateProfile,
      todayRange: todayRange,
      colCnt: dates.length,
      dayHeaderFormat: dayHeaderFormat
    }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableDowCell, {
      key: date.getUTCDay(),
      dow: date.getUTCDay(),
      dayHeaderFormat: dayHeaderFormat
    }))));
  }
}
function createDayHeaderFormatter(explicitFormat, datesRepDistinctDays, dateCnt) {
  return explicitFormat || computeFallbackHeaderFormat(datesRepDistinctDays, dateCnt);
}
class DaySeriesModel {
  constructor(range, dateProfileGenerator) {
    let date = range.start;
    let {
      end
    } = range;
    let indices = [];
    let dates = [];
    let dayIndex = -1;
    while (date < end) {
      // loop each day from start to end
      if (dateProfileGenerator.isHiddenDay(date)) {
        indices.push(dayIndex + 0.5); // mark that it's between indices
      } else {
        dayIndex += 1;
        indices.push(dayIndex);
        dates.push(date);
      }
      date = addDays(date, 1);
    }
    this.dates = dates;
    this.indices = indices;
    this.cnt = dates.length;
  }
  sliceRange(range) {
    let firstIndex = this.getDateDayIndex(range.start); // inclusive first index
    let lastIndex = this.getDateDayIndex(addDays(range.end, -1)); // inclusive last index
    let clippedFirstIndex = Math.max(0, firstIndex);
    let clippedLastIndex = Math.min(this.cnt - 1, lastIndex);
    // deal with in-between indices
    clippedFirstIndex = Math.ceil(clippedFirstIndex); // in-between starts round to next cell
    clippedLastIndex = Math.floor(clippedLastIndex); // in-between ends round to prev cell
    if (clippedFirstIndex <= clippedLastIndex) {
      return {
        firstIndex: clippedFirstIndex,
        lastIndex: clippedLastIndex,
        isStart: firstIndex === clippedFirstIndex,
        isEnd: lastIndex === clippedLastIndex
      };
    }
    return null;
  }
  // Given a date, returns its chronolocial cell-index from the first cell of the grid.
  // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
  // If before the first offset, returns a negative number.
  // If after the last offset, returns an offset past the last cell offset.
  // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
  getDateDayIndex(date) {
    let {
      indices
    } = this;
    let dayOffset = Math.floor(diffDays(this.dates[0], date));
    if (dayOffset < 0) {
      return indices[0] - 1;
    }
    if (dayOffset >= indices.length) {
      return indices[indices.length - 1] + 1;
    }
    return indices[dayOffset];
  }
}
class DayTableModel {
  constructor(daySeries, breakOnWeeks) {
    let {
      dates
    } = daySeries;
    let daysPerRow;
    let firstDay;
    let rowCnt;
    if (breakOnWeeks) {
      // count columns until the day-of-week repeats
      firstDay = dates[0].getUTCDay();
      for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow += 1) {
        if (dates[daysPerRow].getUTCDay() === firstDay) {
          break;
        }
      }
      rowCnt = Math.ceil(dates.length / daysPerRow);
    } else {
      rowCnt = 1;
      daysPerRow = dates.length;
    }
    this.rowCnt = rowCnt;
    this.colCnt = daysPerRow;
    this.daySeries = daySeries;
    this.cells = this.buildCells();
    this.headerDates = this.buildHeaderDates();
  }
  buildCells() {
    let rows = [];
    for (let row = 0; row < this.rowCnt; row += 1) {
      let cells = [];
      for (let col = 0; col < this.colCnt; col += 1) {
        cells.push(this.buildCell(row, col));
      }
      rows.push(cells);
    }
    return rows;
  }
  buildCell(row, col) {
    let date = this.daySeries.dates[row * this.colCnt + col];
    return {
      key: date.toISOString(),
      date
    };
  }
  buildHeaderDates() {
    let dates = [];
    for (let col = 0; col < this.colCnt; col += 1) {
      dates.push(this.cells[0][col].date);
    }
    return dates;
  }
  sliceRange(range) {
    let {
      colCnt
    } = this;
    let seriesSeg = this.daySeries.sliceRange(range);
    let segs = [];
    if (seriesSeg) {
      let {
        firstIndex,
        lastIndex
      } = seriesSeg;
      let index = firstIndex;
      while (index <= lastIndex) {
        let row = Math.floor(index / colCnt);
        let nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1);
        segs.push({
          row,
          firstCol: index % colCnt,
          lastCol: (nextIndex - 1) % colCnt,
          isStart: seriesSeg.isStart && index === firstIndex,
          isEnd: seriesSeg.isEnd && nextIndex - 1 === lastIndex
        });
        index = nextIndex;
      }
    }
    return segs;
  }
}
class Slicer {
  constructor() {
    this.sliceBusinessHours = memoize(this._sliceBusinessHours);
    this.sliceDateSelection = memoize(this._sliceDateSpan);
    this.sliceEventStore = memoize(this._sliceEventStore);
    this.sliceEventDrag = memoize(this._sliceInteraction);
    this.sliceEventResize = memoize(this._sliceInteraction);
    this.forceDayIfListItem = false; // hack
  }
  sliceProps(props, dateProfile, nextDayThreshold, context, ...extraArgs) {
    let {
      eventUiBases
    } = props;
    let eventSegs = this.sliceEventStore(props.eventStore, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs);
    return {
      dateSelectionSegs: this.sliceDateSelection(props.dateSelection, dateProfile, nextDayThreshold, eventUiBases, context, ...extraArgs),
      businessHourSegs: this.sliceBusinessHours(props.businessHours, dateProfile, nextDayThreshold, context, ...extraArgs),
      fgEventSegs: eventSegs.fg,
      bgEventSegs: eventSegs.bg,
      eventDrag: this.sliceEventDrag(props.eventDrag, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs),
      eventResize: this.sliceEventResize(props.eventResize, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs),
      eventSelection: props.eventSelection
    }; // TODO: give interactionSegs?
  }
  sliceNowDate(
  // does not memoize
  date, dateProfile, nextDayThreshold, context, ...extraArgs) {
    return this._sliceDateSpan({
      range: {
        start: date,
        end: addMs(date, 1)
      },
      allDay: false
    },
    // add 1 ms, protect against null range
    dateProfile, nextDayThreshold, {}, context, ...extraArgs);
  }
  _sliceBusinessHours(businessHours, dateProfile, nextDayThreshold, context, ...extraArgs) {
    if (!businessHours) {
      return [];
    }
    return this._sliceEventStore(expandRecurring(businessHours, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), context), {}, dateProfile, nextDayThreshold, ...extraArgs).bg;
  }
  _sliceEventStore(eventStore, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs) {
    if (eventStore) {
      let rangeRes = sliceEventStore(eventStore, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
      return {
        bg: this.sliceEventRanges(rangeRes.bg, extraArgs),
        fg: this.sliceEventRanges(rangeRes.fg, extraArgs)
      };
    }
    return {
      bg: [],
      fg: []
    };
  }
  _sliceInteraction(interaction, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs) {
    if (!interaction) {
      return null;
    }
    let rangeRes = sliceEventStore(interaction.mutatedEvents, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
    return {
      segs: this.sliceEventRanges(rangeRes.fg, extraArgs),
      affectedInstances: interaction.affectedEvents.instances,
      isEvent: interaction.isEvent
    };
  }
  _sliceDateSpan(dateSpan, dateProfile, nextDayThreshold, eventUiBases, context, ...extraArgs) {
    if (!dateSpan) {
      return [];
    }
    let activeRange = computeActiveRange(dateProfile, Boolean(nextDayThreshold));
    let activeDateSpanRange = intersectRanges(dateSpan.range, activeRange);
    if (activeDateSpanRange) {
      dateSpan = Object.assign(Object.assign({}, dateSpan), {
        range: activeDateSpanRange
      });
      let eventRange = fabricateEventRange(dateSpan, eventUiBases, context);
      let segs = this.sliceRange(dateSpan.range, ...extraArgs);
      for (let seg of segs) {
        seg.eventRange = eventRange;
      }
      return segs;
    }
    return [];
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRanges(eventRanges, extraArgs) {
    let segs = [];
    for (let eventRange of eventRanges) {
      segs.push(...this.sliceEventRange(eventRange, extraArgs));
    }
    return segs;
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRange(eventRange, extraArgs) {
    let dateRange = eventRange.range;
    // hack to make multi-day events that are being force-displayed as list-items to take up only one day
    if (this.forceDayIfListItem && eventRange.ui.display === 'list-item') {
      dateRange = {
        start: dateRange.start,
        end: addDays(dateRange.start, 1)
      };
    }
    let segs = this.sliceRange(dateRange, ...extraArgs);
    for (let seg of segs) {
      seg.eventRange = eventRange;
      seg.isStart = eventRange.isStart && seg.isStart;
      seg.isEnd = eventRange.isEnd && seg.isEnd;
    }
    return segs;
  }
}
/*
for incorporating slotMinTime/slotMaxTime if appropriate
TODO: should be part of DateProfile!
TimelineDateProfile already does this btw
*/
function computeActiveRange(dateProfile, isComponentAllDay) {
  let range = dateProfile.activeRange;
  if (isComponentAllDay) {
    return range;
  }
  return {
    start: addMs(range.start, dateProfile.slotMinTime.milliseconds),
    end: addMs(range.end, dateProfile.slotMaxTime.milliseconds - 864e5) // 864e5 = ms in a day
  };
}

// high-level segmenting-aware tester functions
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionValid(interaction, dateProfile, context) {
  let {
    instances
  } = interaction.mutatedEvents;
  for (let instanceId in instances) {
    if (!rangeContainsRange(dateProfile.validRange, instances[instanceId].range)) {
      return false;
    }
  }
  return isNewPropsValid({
    eventDrag: interaction
  }, context); // HACK: the eventDrag props is used for ALL interactions
}
function isDateSelectionValid(dateSelection, dateProfile, context) {
  if (!rangeContainsRange(dateProfile.validRange, dateSelection.range)) {
    return false;
  }
  return isNewPropsValid({
    dateSelection
  }, context);
}
function isNewPropsValid(newProps, context) {
  let calendarState = context.getCurrentData();
  let props = Object.assign({
    businessHours: calendarState.businessHours,
    dateSelection: '',
    eventStore: calendarState.eventStore,
    eventUiBases: calendarState.eventUiBases,
    eventSelection: '',
    eventDrag: null,
    eventResize: null
  }, newProps);
  return (context.pluginHooks.isPropsValid || isPropsValid)(props, context);
}
function isPropsValid(state, context, dateSpanMeta = {}, filterConfig) {
  if (state.eventDrag && !isInteractionPropsValid(state, context, dateSpanMeta, filterConfig)) {
    return false;
  }
  if (state.dateSelection && !isDateSelectionPropsValid(state, context, dateSpanMeta, filterConfig)) {
    return false;
  }
  return true;
}
// Moving Event Validation
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionPropsValid(state, context, dateSpanMeta, filterConfig) {
  let currentState = context.getCurrentData();
  let interaction = state.eventDrag; // HACK: the eventDrag props is used for ALL interactions
  let subjectEventStore = interaction.mutatedEvents;
  let subjectDefs = subjectEventStore.defs;
  let subjectInstances = subjectEventStore.instances;
  let subjectConfigs = compileEventUis(subjectDefs, interaction.isEvent ? state.eventUiBases : {
    '': currentState.selectionConfig
  });
  if (filterConfig) {
    subjectConfigs = mapHash(subjectConfigs, filterConfig);
  }
  // exclude the subject events. TODO: exclude defs too?
  let otherEventStore = excludeInstances(state.eventStore, interaction.affectedEvents.instances);
  let otherDefs = otherEventStore.defs;
  let otherInstances = otherEventStore.instances;
  let otherConfigs = compileEventUis(otherDefs, state.eventUiBases);
  for (let subjectInstanceId in subjectInstances) {
    let subjectInstance = subjectInstances[subjectInstanceId];
    let subjectRange = subjectInstance.range;
    let subjectConfig = subjectConfigs[subjectInstance.defId];
    let subjectDef = subjectDefs[subjectInstance.defId];
    // constraint
    if (!allConstraintsPass(subjectConfig.constraints, subjectRange, otherEventStore, state.businessHours, context)) {
      return false;
    }
    // overlap
    let {
      eventOverlap
    } = context.options;
    let eventOverlapFunc = typeof eventOverlap === 'function' ? eventOverlap : null;
    for (let otherInstanceId in otherInstances) {
      let otherInstance = otherInstances[otherInstanceId];
      // intersect! evaluate
      if (rangesIntersect(subjectRange, otherInstance.range)) {
        let otherOverlap = otherConfigs[otherInstance.defId].overlap;
        // consider the other event's overlap. only do this if the subject event is a "real" event
        if (otherOverlap === false && interaction.isEvent) {
          return false;
        }
        if (subjectConfig.overlap === false) {
          return false;
        }
        if (eventOverlapFunc && !eventOverlapFunc(new EventImpl(context, otherDefs[otherInstance.defId], otherInstance),
        // still event
        new EventImpl(context, subjectDef, subjectInstance))) {
          return false;
        }
      }
    }
    // allow (a function)
    let calendarEventStore = currentState.eventStore; // need global-to-calendar, not local to component (splittable)state
    for (let subjectAllow of subjectConfig.allows) {
      let subjectDateSpan = Object.assign(Object.assign({}, dateSpanMeta), {
        range: subjectInstance.range,
        allDay: subjectDef.allDay
      });
      let origDef = calendarEventStore.defs[subjectDef.defId];
      let origInstance = calendarEventStore.instances[subjectInstanceId];
      let eventApi;
      if (origDef) {
        // was previously in the calendar
        eventApi = new EventImpl(context, origDef, origInstance);
      } else {
        // was an external event
        eventApi = new EventImpl(context, subjectDef); // no instance, because had no dates
      }
      if (!subjectAllow(buildDateSpanApiWithContext(subjectDateSpan, context), eventApi)) {
        return false;
      }
    }
  }
  return true;
}
// Date Selection Validation
// ------------------------------------------------------------------------------------------------------------------------
function isDateSelectionPropsValid(state, context, dateSpanMeta, filterConfig) {
  let relevantEventStore = state.eventStore;
  let relevantDefs = relevantEventStore.defs;
  let relevantInstances = relevantEventStore.instances;
  let selection = state.dateSelection;
  let selectionRange = selection.range;
  let {
    selectionConfig
  } = context.getCurrentData();
  if (filterConfig) {
    selectionConfig = filterConfig(selectionConfig);
  }
  // constraint
  if (!allConstraintsPass(selectionConfig.constraints, selectionRange, relevantEventStore, state.businessHours, context)) {
    return false;
  }
  // overlap
  let {
    selectOverlap
  } = context.options;
  let selectOverlapFunc = typeof selectOverlap === 'function' ? selectOverlap : null;
  for (let relevantInstanceId in relevantInstances) {
    let relevantInstance = relevantInstances[relevantInstanceId];
    // intersect! evaluate
    if (rangesIntersect(selectionRange, relevantInstance.range)) {
      if (selectionConfig.overlap === false) {
        return false;
      }
      if (selectOverlapFunc && !selectOverlapFunc(new EventImpl(context, relevantDefs[relevantInstance.defId], relevantInstance), null)) {
        return false;
      }
    }
  }
  // allow (a function)
  for (let selectionAllow of selectionConfig.allows) {
    let fullDateSpan = Object.assign(Object.assign({}, dateSpanMeta), selection);
    if (!selectionAllow(buildDateSpanApiWithContext(fullDateSpan, context), null)) {
      return false;
    }
  }
  return true;
}
// Constraint Utils
// ------------------------------------------------------------------------------------------------------------------------
function allConstraintsPass(constraints, subjectRange, otherEventStore, businessHoursUnexpanded, context) {
  for (let constraint of constraints) {
    if (!anyRangesContainRange(constraintToRanges(constraint, subjectRange, otherEventStore, businessHoursUnexpanded, context), subjectRange)) {
      return false;
    }
  }
  return true;
}
function constraintToRanges(constraint, subjectRange,
// for expanding a recurring constraint, or expanding business hours
otherEventStore,
// for if constraint is an even group ID
businessHoursUnexpanded,
// for if constraint is 'businessHours'
context) {
  if (constraint === 'businessHours') {
    return eventStoreToRanges(expandRecurring(businessHoursUnexpanded, subjectRange, context));
  }
  if (typeof constraint === 'string') {
    // an group ID
    return eventStoreToRanges(filterEventStoreDefs(otherEventStore, eventDef => eventDef.groupId === constraint));
  }
  if (typeof constraint === 'object' && constraint) {
    // non-null object
    return eventStoreToRanges(expandRecurring(constraint, subjectRange, context));
  }
  return []; // if it's false
}
// TODO: move to event-store file?
function eventStoreToRanges(eventStore) {
  let {
    instances
  } = eventStore;
  let ranges = [];
  for (let instanceId in instances) {
    ranges.push(instances[instanceId].range);
  }
  return ranges;
}
// TODO: move to geom file?
function anyRangesContainRange(outerRanges, innerRange) {
  for (let outerRange of outerRanges) {
    if (rangeContainsRange(outerRange, innerRange)) {
      return true;
    }
  }
  return false;
}
const VISIBLE_HIDDEN_RE = /^(visible|hidden)$/;
class Scroller extends BaseComponent {
  constructor() {
    super(...arguments);
    this.handleEl = el => {
      this.el = el;
      setRef(this.props.elRef, el);
    };
  }
  render() {
    let {
      props
    } = this;
    let {
      liquid,
      liquidIsAbsolute
    } = props;
    let isAbsolute = liquid && liquidIsAbsolute;
    let className = ['fc-scroller'];
    if (liquid) {
      if (liquidIsAbsolute) {
        className.push('fc-scroller-liquid-absolute');
      } else {
        className.push('fc-scroller-liquid');
      }
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: this.handleEl,
      className: className.join(' '),
      style: {
        overflowX: props.overflowX,
        overflowY: props.overflowY,
        left: isAbsolute && -(props.overcomeLeft || 0) || '',
        right: isAbsolute && -(props.overcomeRight || 0) || '',
        bottom: isAbsolute && -(props.overcomeBottom || 0) || '',
        marginLeft: !isAbsolute && -(props.overcomeLeft || 0) || '',
        marginRight: !isAbsolute && -(props.overcomeRight || 0) || '',
        marginBottom: !isAbsolute && -(props.overcomeBottom || 0) || '',
        maxHeight: props.maxHeight || ''
      }
    }, props.children);
  }
  needsXScrolling() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
      return false;
    }
    // testing scrollWidth>clientWidth is unreliable cross-browser when pixel heights aren't integers.
    // much more reliable to see if children are taller than the scroller, even tho doesn't account for
    // inner-child margins and absolute positioning
    let {
      el
    } = this;
    let realClientWidth = this.el.getBoundingClientRect().width - this.getYScrollbarWidth();
    let {
      children
    } = el;
    for (let i = 0; i < children.length; i += 1) {
      let childEl = children[i];
      if (childEl.getBoundingClientRect().width > realClientWidth) {
        return true;
      }
    }
    return false;
  }
  needsYScrolling() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
      return false;
    }
    // testing scrollHeight>clientHeight is unreliable cross-browser when pixel heights aren't integers.
    // much more reliable to see if children are taller than the scroller, even tho doesn't account for
    // inner-child margins and absolute positioning
    let {
      el
    } = this;
    let realClientHeight = this.el.getBoundingClientRect().height - this.getXScrollbarWidth();
    let {
      children
    } = el;
    for (let i = 0; i < children.length; i += 1) {
      let childEl = children[i];
      if (childEl.getBoundingClientRect().height > realClientHeight) {
        return true;
      }
    }
    return false;
  }
  getXScrollbarWidth() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
      return 0;
    }
    return this.el.offsetHeight - this.el.clientHeight; // only works because we guarantee no borders. TODO: add to CSS with important?
  }
  getYScrollbarWidth() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
      return 0;
    }
    return this.el.offsetWidth - this.el.clientWidth; // only works because we guarantee no borders. TODO: add to CSS with important?
  }
}

/*
TODO: somehow infer OtherArgs from masterCallback?
TODO: infer RefType from masterCallback if provided
*/
class RefMap {
  constructor(masterCallback) {
    this.masterCallback = masterCallback;
    this.currentMap = {};
    this.depths = {};
    this.callbackMap = {};
    this.handleValue = (val, key) => {
      let {
        depths,
        currentMap
      } = this;
      let removed = false;
      let added = false;
      if (val !== null) {
        // for bug... ACTUALLY: can probably do away with this now that callers don't share numeric indices anymore
        removed = key in currentMap;
        currentMap[key] = val;
        depths[key] = (depths[key] || 0) + 1;
        added = true;
      } else {
        depths[key] -= 1;
        if (!depths[key]) {
          delete currentMap[key];
          delete this.callbackMap[key];
          removed = true;
        }
      }
      if (this.masterCallback) {
        if (removed) {
          this.masterCallback(null, String(key));
        }
        if (added) {
          this.masterCallback(val, String(key));
        }
      }
    };
  }
  createRef(key) {
    let refCallback = this.callbackMap[key];
    if (!refCallback) {
      refCallback = this.callbackMap[key] = val => {
        this.handleValue(val, String(key));
      };
    }
    return refCallback;
  }
  // TODO: check callers that don't care about order. should use getAll instead
  // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
  // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
  collect(startIndex, endIndex, step) {
    return collectFromHash(this.currentMap, startIndex, endIndex, step);
  }
  getAll() {
    return hashValuesToArray(this.currentMap);
  }
}
function computeShrinkWidth(chunkEls) {
  let shrinkCells = findElements(chunkEls, '.fc-scrollgrid-shrink');
  let largestWidth = 0;
  for (let shrinkCell of shrinkCells) {
    largestWidth = Math.max(largestWidth, computeSmallestCellWidth(shrinkCell));
  }
  return Math.ceil(largestWidth); // <table> elements work best with integers. round up to ensure contents fits
}
function getSectionHasLiquidHeight(props, sectionConfig) {
  return props.liquid && sectionConfig.liquid; // does the section do liquid-height? (need to have whole scrollgrid liquid-height as well)
}
function getAllowYScrolling(props, sectionConfig) {
  return sectionConfig.maxHeight != null ||
  // if its possible for the height to max out, we might need scrollbars
  getSectionHasLiquidHeight(props, sectionConfig); // if the section is liquid height, it might condense enough to require scrollbars
}
// TODO: ONLY use `arg`. force out internal function to use same API
function renderChunkContent(sectionConfig, chunkConfig, arg, isHeader) {
  let {
    expandRows
  } = arg;
  let content = typeof chunkConfig.content === 'function' ? chunkConfig.content(arg) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('table', {
    role: 'presentation',
    className: [chunkConfig.tableClassName, sectionConfig.syncRowHeights ? 'fc-scrollgrid-sync-table' : ''].join(' '),
    style: {
      minWidth: arg.tableMinWidth,
      width: arg.clientWidth,
      height: expandRows ? arg.clientHeight : '' // css `height` on a <table> serves as a min-height
    }
  }, arg.tableColGroupNode, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(isHeader ? 'thead' : 'tbody', {
    role: 'presentation'
  }, typeof chunkConfig.rowContent === 'function' ? chunkConfig.rowContent(arg) : chunkConfig.rowContent));
  return content;
}
function isColPropsEqual(cols0, cols1) {
  return isArraysEqual(cols0, cols1, isPropsEqual);
}
function renderMicroColGroup(cols, shrinkWidth) {
  let colNodes = [];
  /*
  for ColProps with spans, it would have been great to make a single <col span="">
  HOWEVER, Chrome was getting messing up distributing the width to <td>/<th> elements with colspans.
  SOLUTION: making individual <col> elements makes Chrome behave.
  */
  for (let colProps of cols) {
    let span = colProps.span || 1;
    for (let i = 0; i < span; i += 1) {
      colNodes.push((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("col", {
        style: {
          width: colProps.width === 'shrink' ? sanitizeShrinkWidth(shrinkWidth) : colProps.width || '',
          minWidth: colProps.minWidth || ''
        }
      }));
    }
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('colgroup', {}, ...colNodes);
}
function sanitizeShrinkWidth(shrinkWidth) {
  /* why 4? if we do 0, it will kill any border, which are needed for computeSmallestCellWidth
  4 accounts for 2 2-pixel borders. TODO: better solution? */
  return shrinkWidth == null ? 4 : shrinkWidth;
}
function hasShrinkWidth(cols) {
  for (let col of cols) {
    if (col.width === 'shrink') {
      return true;
    }
  }
  return false;
}
function getScrollGridClassNames(liquid, context) {
  let classNames = ['fc-scrollgrid', context.theme.getClass('table')];
  if (liquid) {
    classNames.push('fc-scrollgrid-liquid');
  }
  return classNames;
}
function getSectionClassNames(sectionConfig, wholeTableVGrow) {
  let classNames = ['fc-scrollgrid-section', `fc-scrollgrid-section-${sectionConfig.type}`, sectionConfig.className // used?
  ];
  if (wholeTableVGrow && sectionConfig.liquid && sectionConfig.maxHeight == null) {
    classNames.push('fc-scrollgrid-section-liquid');
  }
  if (sectionConfig.isSticky) {
    classNames.push('fc-scrollgrid-section-sticky');
  }
  return classNames;
}
function renderScrollShim(arg) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-scrollgrid-sticky-shim",
    style: {
      width: arg.clientWidth,
      minWidth: arg.tableMinWidth
    }
  });
}
function getStickyHeaderDates(options) {
  let {
    stickyHeaderDates
  } = options;
  if (stickyHeaderDates == null || stickyHeaderDates === 'auto') {
    stickyHeaderDates = options.height === 'auto' || options.viewHeight === 'auto';
  }
  return stickyHeaderDates;
}
function getStickyFooterScrollbar(options) {
  let {
    stickyFooterScrollbar
  } = options;
  if (stickyFooterScrollbar == null || stickyFooterScrollbar === 'auto') {
    stickyFooterScrollbar = options.height === 'auto' || options.viewHeight === 'auto';
  }
  return stickyFooterScrollbar;
}
class SimpleScrollGrid extends BaseComponent {
  constructor() {
    super(...arguments);
    this.processCols = memoize(a => a, isColPropsEqual); // so we get same `cols` props every time
    // yucky to memoize VNodes, but much more efficient for consumers
    this.renderMicroColGroup = memoize(renderMicroColGroup);
    this.scrollerRefs = new RefMap();
    this.scrollerElRefs = new RefMap(this._handleScrollerEl.bind(this));
    this.state = {
      shrinkWidth: null,
      forceYScrollbars: false,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    };
    // TODO: can do a really simple print-view. dont need to join rows
    this.handleSizing = () => {
      this.safeSetState(Object.assign({
        shrinkWidth: this.computeShrinkWidth()
      }, this.computeScrollerDims()));
    };
  }
  render() {
    let {
      props,
      state,
      context
    } = this;
    let sectionConfigs = props.sections || [];
    let cols = this.processCols(props.cols);
    let microColGroupNode = this.renderMicroColGroup(cols, state.shrinkWidth);
    let classNames = getScrollGridClassNames(props.liquid, context);
    if (props.collapsibleWidth) {
      classNames.push('fc-scrollgrid-collapsible');
    }
    // TODO: make DRY
    let configCnt = sectionConfigs.length;
    let configI = 0;
    let currentConfig;
    let headSectionNodes = [];
    let bodySectionNodes = [];
    let footSectionNodes = [];
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'header') {
      headSectionNodes.push(this.renderSection(currentConfig, microColGroupNode, true));
      configI += 1;
    }
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'body') {
      bodySectionNodes.push(this.renderSection(currentConfig, microColGroupNode, false));
      configI += 1;
    }
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'footer') {
      footSectionNodes.push(this.renderSection(currentConfig, microColGroupNode, true));
      configI += 1;
    }
    // firefox bug: when setting height on table and there is a thead or tfoot,
    // the necessary height:100% on the liquid-height body section forces the *whole* table to be taller. (bug #5524)
    // use getCanVGrowWithinCell as a way to detect table-stupid firefox.
    // if so, use a simpler dom structure, jam everything into a lone tbody.
    let isBuggy = !getCanVGrowWithinCell();
    const roleAttrs = {
      role: 'rowgroup'
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('table', {
      role: 'grid',
      className: classNames.join(' '),
      style: {
        height: props.height
      }
    }, Boolean(!isBuggy && headSectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('thead', roleAttrs, ...headSectionNodes), Boolean(!isBuggy && bodySectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tbody', roleAttrs, ...bodySectionNodes), Boolean(!isBuggy && footSectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tfoot', roleAttrs, ...footSectionNodes), isBuggy && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tbody', roleAttrs, ...headSectionNodes, ...bodySectionNodes, ...footSectionNodes));
  }
  renderSection(sectionConfig, microColGroupNode, isHeader) {
    if ('outerContent' in sectionConfig) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: sectionConfig.key
      }, sectionConfig.outerContent);
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: sectionConfig.key,
      role: "presentation",
      className: getSectionClassNames(sectionConfig, this.props.liquid).join(' ')
    }, this.renderChunkTd(sectionConfig, microColGroupNode, sectionConfig.chunk, isHeader));
  }
  renderChunkTd(sectionConfig, microColGroupNode, chunkConfig, isHeader) {
    if ('outerContent' in chunkConfig) {
      return chunkConfig.outerContent;
    }
    let {
      props
    } = this;
    let {
      forceYScrollbars,
      scrollerClientWidths,
      scrollerClientHeights
    } = this.state;
    let needsYScrolling = getAllowYScrolling(props, sectionConfig); // TODO: do lazily. do in section config?
    let isLiquid = getSectionHasLiquidHeight(props, sectionConfig);
    // for `!props.liquid` - is WHOLE scrollgrid natural height?
    // TODO: do same thing in advanced scrollgrid? prolly not b/c always has horizontal scrollbars
    let overflowY = !props.liquid ? 'visible' : forceYScrollbars ? 'scroll' : !needsYScrolling ? 'hidden' : 'auto';
    let sectionKey = sectionConfig.key;
    let content = renderChunkContent(sectionConfig, chunkConfig, {
      tableColGroupNode: microColGroupNode,
      tableMinWidth: '',
      clientWidth: !props.collapsibleWidth && scrollerClientWidths[sectionKey] !== undefined ? scrollerClientWidths[sectionKey] : null,
      clientHeight: scrollerClientHeights[sectionKey] !== undefined ? scrollerClientHeights[sectionKey] : null,
      expandRows: sectionConfig.expandRows,
      syncRowHeights: false,
      rowSyncHeights: [],
      reportRowHeightChange: () => {}
    }, isHeader);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(isHeader ? 'th' : 'td', {
      ref: chunkConfig.elRef,
      role: 'presentation'
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `fc-scroller-harness${isLiquid ? ' fc-scroller-harness-liquid' : ''}`
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(Scroller, {
      ref: this.scrollerRefs.createRef(sectionKey),
      elRef: this.scrollerElRefs.createRef(sectionKey),
      overflowY: overflowY,
      overflowX: !props.liquid ? 'visible' : 'hidden' /* natural height? */,
      maxHeight: sectionConfig.maxHeight,
      liquid: isLiquid,
      liquidIsAbsolute // because its within a harness
      : true
    }, content)));
  }
  _handleScrollerEl(scrollerEl, key) {
    let section = getSectionByKey(this.props.sections, key);
    if (section) {
      setRef(section.chunk.scrollerElRef, scrollerEl);
    }
  }
  componentDidMount() {
    this.handleSizing();
    this.context.addResizeHandler(this.handleSizing);
  }
  componentDidUpdate() {
    // TODO: need better solution when state contains non-sizing things
    this.handleSizing();
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleSizing);
  }
  computeShrinkWidth() {
    return hasShrinkWidth(this.props.cols) ? computeShrinkWidth(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let scrollbarWidth = getScrollbarWidths();
    let {
      scrollerRefs,
      scrollerElRefs
    } = this;
    let forceYScrollbars = false;
    let scrollerClientWidths = {};
    let scrollerClientHeights = {};
    for (let sectionKey in scrollerRefs.currentMap) {
      let scroller = scrollerRefs.currentMap[sectionKey];
      if (scroller && scroller.needsYScrolling()) {
        forceYScrollbars = true;
        break;
      }
    }
    for (let section of this.props.sections) {
      let sectionKey = section.key;
      let scrollerEl = scrollerElRefs.currentMap[sectionKey];
      if (scrollerEl) {
        let harnessEl = scrollerEl.parentNode; // TODO: weird way to get this. need harness b/c doesn't include table borders
        scrollerClientWidths[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().width - (forceYScrollbars ? scrollbarWidth.y // use global because scroller might not have scrollbars yet but will need them in future
        : 0));
        scrollerClientHeights[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().height);
      }
    }
    return {
      forceYScrollbars,
      scrollerClientWidths,
      scrollerClientHeights
    };
  }
}
SimpleScrollGrid.addStateEquality({
  scrollerClientWidths: isPropsEqual,
  scrollerClientHeights: isPropsEqual
});
function getSectionByKey(sections, key) {
  for (let section of sections) {
    if (section.key === key) {
      return section;
    }
  }
  return null;
}
class EventContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.handleEl = el => {
      this.el = el;
      if (el) {
        setElSeg(el, this.props.seg);
      }
    };
  }
  render() {
    const {
      props,
      context
    } = this;
    const {
      options
    } = context;
    const {
      seg
    } = props;
    const {
      eventRange
    } = seg;
    const {
      ui
    } = eventRange;
    const renderProps = {
      event: new EventImpl(context, eventRange.def, eventRange.instance),
      view: context.viewApi,
      timeText: props.timeText,
      textColor: ui.textColor,
      backgroundColor: ui.backgroundColor,
      borderColor: ui.borderColor,
      isDraggable: !props.disableDragging && computeSegDraggable(seg, context),
      isStartResizable: !props.disableResizing && computeSegStartResizable(seg, context),
      isEndResizable: !props.disableResizing && computeSegEndResizable(seg),
      isMirror: Boolean(props.isDragging || props.isResizing || props.isDateSelecting),
      isStart: Boolean(seg.isStart),
      isEnd: Boolean(seg.isEnd),
      isPast: Boolean(props.isPast),
      isFuture: Boolean(props.isFuture),
      isToday: Boolean(props.isToday),
      isSelected: Boolean(props.isSelected),
      isDragging: Boolean(props.isDragging),
      isResizing: Boolean(props.isResizing)
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* contains children */, {
      elRef: this.handleEl,
      elClasses: [...getEventClassNames(renderProps), ...seg.eventRange.ui.classNames, ...(props.elClasses || [])],
      renderProps: renderProps,
      generatorName: "eventContent",
      customGenerator: options.eventContent,
      defaultGenerator: props.defaultGenerator,
      classNameGenerator: options.eventClassNames,
      didMount: options.eventDidMount,
      willUnmount: options.eventWillUnmount
    }));
  }
  componentDidUpdate(prevProps) {
    if (this.el && this.props.seg !== prevProps.seg) {
      setElSeg(this.el, this.props.seg);
    }
  }
}

// should not be a purecomponent
class StandardEvent extends BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let {
      seg
    } = props;
    let {
      ui
    } = seg.eventRange;
    let timeFormat = options.eventTimeFormat || props.defaultTimeFormat;
    let timeText = buildSegTimeText(seg, timeFormat, context, props.defaultDisplayEventTime, props.defaultDisplayEventEnd);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContainer, Object.assign({}, props /* includes elRef */, {
      elTag: "a",
      elStyle: {
        borderColor: ui.borderColor,
        backgroundColor: ui.backgroundColor
      },
      elAttrs: getSegAnchorAttrs(seg, context),
      defaultGenerator: renderInnerContent$1,
      timeText: timeText
    }), (InnerContent, eventContentArg) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "div",
      elClasses: ['fc-event-main'],
      elStyle: {
        color: eventContentArg.textColor
      }
    }), Boolean(eventContentArg.isStartResizable) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-event-resizer fc-event-resizer-start"
    }), Boolean(eventContentArg.isEndResizable) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-event-resizer fc-event-resizer-end"
    })));
  }
}
function renderInnerContent$1(innerProps) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-main-frame"
  }, innerProps.timeText && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-time"
  }, innerProps.timeText), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title fc-sticky"
  }, innerProps.event.title || (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\u00A0"))));
}
const NowIndicatorContainer = props => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
  let {
    options
  } = context;
  let renderProps = {
    isAxis: props.isAxis,
    date: context.dateEnv.toDate(props.date),
    view: context.viewApi
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* includes children */, {
    elTag: props.elTag || 'div',
    renderProps: renderProps,
    generatorName: "nowIndicatorContent",
    customGenerator: options.nowIndicatorContent,
    classNameGenerator: options.nowIndicatorClassNames,
    didMount: options.nowIndicatorDidMount,
    willUnmount: options.nowIndicatorWillUnmount
  }));
});
const DAY_NUM_FORMAT = createFormatter({
  day: 'numeric'
});
class DayCellContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.refineRenderProps = memoizeObjArg(refineRenderProps);
  }
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let renderProps = this.refineRenderProps({
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      isMonthStart: props.isMonthStart || false,
      showDayNumber: props.showDayNumber,
      extraRenderProps: props.extraRenderProps,
      viewApi: context.viewApi,
      dateEnv: context.dateEnv,
      monthStartFormat: options.monthStartFormat
    });
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* includes children */, {
      elClasses: [...getDayClassNames(renderProps, context.theme), ...(props.elClasses || [])],
      elAttrs: Object.assign(Object.assign({}, props.elAttrs), renderProps.isDisabled ? {} : {
        'data-date': formatDayString(props.date)
      }),
      renderProps: renderProps,
      generatorName: "dayCellContent",
      customGenerator: options.dayCellContent,
      defaultGenerator: props.defaultGenerator,
      classNameGenerator:
      // don't use custom classNames if disabled
      renderProps.isDisabled ? undefined : options.dayCellClassNames,
      didMount: options.dayCellDidMount,
      willUnmount: options.dayCellWillUnmount
    }));
  }
}
function hasCustomDayCellContent(options) {
  return Boolean(options.dayCellContent || hasCustomRenderingHandler('dayCellContent', options));
}
function refineRenderProps(raw) {
  let {
    date,
    dateEnv,
    dateProfile,
    isMonthStart
  } = raw;
  let dayMeta = getDateMeta(date, raw.todayRange, null, dateProfile);
  let dayNumberText = raw.showDayNumber ? dateEnv.format(date, isMonthStart ? raw.monthStartFormat : DAY_NUM_FORMAT) : '';
  return Object.assign(Object.assign(Object.assign({
    date: dateEnv.toDate(date),
    view: raw.viewApi
  }, dayMeta), {
    isMonthStart,
    dayNumberText
  }), raw.extraRenderProps);
}
class BgEvent extends BaseComponent {
  render() {
    let {
      props
    } = this;
    let {
      seg
    } = props;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContainer, {
      elTag: "div",
      elClasses: ['fc-bg-event'],
      elStyle: {
        backgroundColor: seg.eventRange.ui.backgroundColor
      },
      defaultGenerator: renderInnerContent,
      seg: seg,
      timeText: "",
      isDragging: false,
      isResizing: false,
      isDateSelecting: false,
      isSelected: false,
      isPast: props.isPast,
      isFuture: props.isFuture,
      isToday: props.isToday,
      disableDragging: true,
      disableResizing: true
    });
  }
}
function renderInnerContent(props) {
  let {
    title
  } = props.event;
  return title && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title"
  }, props.event.title);
}
function renderFill(fillType) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `fc-${fillType}`
  });
}
const WeekNumberContainer = props => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
  let {
    dateEnv,
    options
  } = context;
  let {
    date
  } = props;
  let format = options.weekNumberFormat || props.defaultFormat;
  let num = dateEnv.computeWeekNumber(date); // TODO: somehow use for formatting as well?
  let text = dateEnv.format(date, format);
  let renderProps = {
    num,
    text,
    date
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer // why isn't WeekNumberContentArg being auto-detected?
  , Object.assign({}, props /* includes children */, {
    renderProps: renderProps,
    generatorName: "weekNumberContent",
    customGenerator: options.weekNumberContent,
    defaultGenerator: renderInner,
    classNameGenerator: options.weekNumberClassNames,
    didMount: options.weekNumberDidMount,
    willUnmount: options.weekNumberWillUnmount
  }));
});
function renderInner(innerProps) {
  return innerProps.text;
}
const PADDING_FROM_VIEWPORT = 10;
class Popover extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      titleId: getUniqueDomId()
    };
    this.handleRootEl = el => {
      this.rootEl = el;
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
      }
    };
    // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
    this.handleDocumentMouseDown = ev => {
      // only hide the popover if the click happened outside the popover
      const target = getEventTargetViaRoot(ev);
      if (!this.rootEl.contains(target)) {
        this.handleCloseClick();
      }
    };
    this.handleDocumentKeyDown = ev => {
      if (ev.key === 'Escape') {
        this.handleCloseClick();
      }
    };
    this.handleCloseClick = () => {
      let {
        onClose
      } = this.props;
      if (onClose) {
        onClose();
      }
    };
  }
  render() {
    let {
      theme,
      options
    } = this.context;
    let {
      props,
      state
    } = this;
    let classNames = ['fc-popover', theme.getClass('popover')].concat(props.extraClassNames || []);
    return (0,preact_compat__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", Object.assign({}, props.extraAttrs, {
      id: props.id,
      className: classNames.join(' '),
      "aria-labelledby": state.titleId,
      ref: this.handleRootEl
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'fc-popover-header ' + theme.getClass('popoverHeader')
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fc-popover-title",
      id: state.titleId
    }, props.title), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: 'fc-popover-close ' + theme.getIconClass('close'),
      title: options.closeHint,
      onClick: this.handleCloseClick
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'fc-popover-body ' + theme.getClass('popoverContent')
    }, props.children)), props.parentEl);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }
  updateSize() {
    let {
      isRtl
    } = this.context;
    let {
      alignmentEl,
      alignGridTop
    } = this.props;
    let {
      rootEl
    } = this;
    let alignmentRect = computeClippedClientRect(alignmentEl);
    if (alignmentRect) {
      let popoverDims = rootEl.getBoundingClientRect();
      // position relative to viewport
      let popoverTop = alignGridTop ? elementClosest(alignmentEl, '.fc-scrollgrid').getBoundingClientRect().top : alignmentRect.top;
      let popoverLeft = isRtl ? alignmentRect.right - popoverDims.width : alignmentRect.left;
      // constrain
      popoverTop = Math.max(popoverTop, PADDING_FROM_VIEWPORT);
      popoverLeft = Math.min(popoverLeft, document.documentElement.clientWidth - PADDING_FROM_VIEWPORT - popoverDims.width);
      popoverLeft = Math.max(popoverLeft, PADDING_FROM_VIEWPORT);
      let origin = rootEl.offsetParent.getBoundingClientRect();
      applyStyle(rootEl, {
        top: popoverTop - origin.top,
        left: popoverLeft - origin.left
      });
    }
  }
}
class MorePopover extends DateComponent {
  constructor() {
    super(...arguments);
    this.handleRootEl = rootEl => {
      this.rootEl = rootEl;
      if (rootEl) {
        this.context.registerInteractiveComponent(this, {
          el: rootEl,
          useEventCenter: false
        });
      } else {
        this.context.unregisterInteractiveComponent(this);
      }
    };
  }
  render() {
    let {
      options,
      dateEnv
    } = this.context;
    let {
      props
    } = this;
    let {
      startDate,
      todayRange,
      dateProfile
    } = props;
    let title = dateEnv.format(startDate, options.dayPopoverFormat);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(DayCellContainer, {
      elRef: this.handleRootEl,
      date: startDate,
      dateProfile: dateProfile,
      todayRange: todayRange
    }, (InnerContent, renderProps, elAttrs) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(Popover, {
      elRef: elAttrs.ref,
      id: props.id,
      title: title,
      extraClassNames: ['fc-more-popover'].concat(elAttrs.className || []),
      extraAttrs: elAttrs /* TODO: make these time-based when not whole-day? */,
      parentEl: props.parentEl,
      alignmentEl: props.alignmentEl,
      alignGridTop: props.alignGridTop,
      onClose: props.onClose
    }, hasCustomDayCellContent(options) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "div",
      elClasses: ['fc-more-popover-misc']
    }), props.children));
  }
  queryHit(positionLeft, positionTop, elWidth, elHeight) {
    let {
      rootEl,
      props
    } = this;
    if (positionLeft >= 0 && positionLeft < elWidth && positionTop >= 0 && positionTop < elHeight) {
      return {
        dateProfile: props.dateProfile,
        dateSpan: Object.assign({
          allDay: !props.forceTimed,
          range: {
            start: props.startDate,
            end: props.endDate
          }
        }, props.extraDateSpan),
        dayEl: rootEl,
        rect: {
          left: 0,
          top: 0,
          right: elWidth,
          bottom: elHeight
        },
        layer: 1 // important when comparing with hits from other components
      };
    }
    return null;
  }
}
class MoreLinkContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isPopoverOpen: false,
      popoverId: getUniqueDomId()
    };
    this.handleLinkEl = linkEl => {
      this.linkEl = linkEl;
      if (this.props.elRef) {
        setRef(this.props.elRef, linkEl);
      }
    };
    this.handleClick = ev => {
      let {
        props,
        context
      } = this;
      let {
        moreLinkClick
      } = context.options;
      let date = computeRange(props).start;
      function buildPublicSeg(seg) {
        let {
          def,
          instance,
          range
        } = seg.eventRange;
        return {
          event: new EventImpl(context, def, instance),
          start: context.dateEnv.toDate(range.start),
          end: context.dateEnv.toDate(range.end),
          isStart: seg.isStart,
          isEnd: seg.isEnd
        };
      }
      if (typeof moreLinkClick === 'function') {
        moreLinkClick = moreLinkClick({
          date,
          allDay: Boolean(props.allDayDate),
          allSegs: props.allSegs.map(buildPublicSeg),
          hiddenSegs: props.hiddenSegs.map(buildPublicSeg),
          jsEvent: ev,
          view: context.viewApi
        });
      }
      if (!moreLinkClick || moreLinkClick === 'popover') {
        this.setState({
          isPopoverOpen: true
        });
      } else if (typeof moreLinkClick === 'string') {
        // a view name
        context.calendarApi.zoomTo(date, moreLinkClick);
      }
    };
    this.handlePopoverClose = () => {
      this.setState({
        isPopoverOpen: false
      });
    };
  }
  render() {
    let {
      props,
      state
    } = this;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
      let {
        viewApi,
        options,
        calendarApi
      } = context;
      let {
        moreLinkText
      } = options;
      let {
        moreCnt
      } = props;
      let range = computeRange(props);
      let text = typeof moreLinkText === 'function' // TODO: eventually use formatWithOrdinals
      ? moreLinkText.call(calendarApi, moreCnt) : `+${moreCnt} ${moreLinkText}`;
      let hint = formatWithOrdinals(options.moreLinkHint, [moreCnt], text);
      let renderProps = {
        num: moreCnt,
        shortText: `+${moreCnt}`,
        text,
        view: viewApi
      };
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Boolean(props.moreCnt) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
        elTag: props.elTag || 'a',
        elRef: this.handleLinkEl,
        elClasses: [...(props.elClasses || []), 'fc-more-link'],
        elStyle: props.elStyle,
        elAttrs: Object.assign(Object.assign(Object.assign({}, props.elAttrs), createAriaClickAttrs(this.handleClick)), {
          title: hint,
          'aria-expanded': state.isPopoverOpen,
          'aria-controls': state.isPopoverOpen ? state.popoverId : ''
        }),
        renderProps: renderProps,
        generatorName: "moreLinkContent",
        customGenerator: options.moreLinkContent,
        defaultGenerator: props.defaultGenerator || renderMoreLinkInner,
        classNameGenerator: options.moreLinkClassNames,
        didMount: options.moreLinkDidMount,
        willUnmount: options.moreLinkWillUnmount
      }, props.children), state.isPopoverOpen && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(MorePopover, {
        id: state.popoverId,
        startDate: range.start,
        endDate: range.end,
        dateProfile: props.dateProfile,
        todayRange: props.todayRange,
        extraDateSpan: props.extraDateSpan,
        parentEl: this.parentEl,
        alignmentEl: props.alignmentElRef ? props.alignmentElRef.current : this.linkEl,
        alignGridTop: props.alignGridTop,
        forceTimed: props.forceTimed,
        onClose: this.handlePopoverClose
      }, props.popoverContent()));
    });
  }
  componentDidMount() {
    this.updateParentEl();
  }
  componentDidUpdate() {
    this.updateParentEl();
  }
  updateParentEl() {
    if (this.linkEl) {
      this.parentEl = elementClosest(this.linkEl, '.fc-view-harness');
    }
  }
}
function renderMoreLinkInner(props) {
  return props.text;
}
function computeRange(props) {
  if (props.allDayDate) {
    return {
      start: props.allDayDate,
      end: addDays(props.allDayDate, 1)
    };
  }
  let {
    hiddenSegs
  } = props;
  return {
    start: computeEarliestSegStart(hiddenSegs),
    end: computeLatestSegEnd(hiddenSegs)
  };
}
function computeEarliestSegStart(segs) {
  return segs.reduce(pickEarliestStart).eventRange.range.start;
}
function pickEarliestStart(seg0, seg1) {
  return seg0.eventRange.range.start < seg1.eventRange.range.start ? seg0 : seg1;
}
function computeLatestSegEnd(segs) {
  return segs.reduce(pickLatestEnd).eventRange.range.end;
}
function pickLatestEnd(seg0, seg1) {
  return seg0.eventRange.range.end > seg1.eventRange.range.end ? seg0 : seg1;
}
class Store {
  constructor() {
    this.handlers = [];
  }
  set(value) {
    this.currentValue = value;
    for (let handler of this.handlers) {
      handler(value);
    }
  }
  subscribe(handler) {
    this.handlers.push(handler);
    if (this.currentValue !== undefined) {
      handler(this.currentValue);
    }
  }
}

/*
Subscribers will get a LIST of CustomRenderings
*/
class CustomRenderingStore extends Store {
  constructor() {
    super(...arguments);
    this.map = new Map();
  }
  // for consistent order
  handle(customRendering) {
    const {
      map
    } = this;
    let updated = false;
    if (customRendering.isActive) {
      map.set(customRendering.id, customRendering);
      updated = true;
    } else if (map.has(customRendering.id)) {
      map.delete(customRendering.id);
      updated = true;
    }
    if (updated) {
      this.set(map);
    }
  }
}


/***/ }),

/***/ 3280:
/*!*******************************************************!*\
  !*** ./node_modules/@fullcalendar/core/locales/ru.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ l60)
/* harmony export */ });
var l60 = {
  code: 'ru',
  week: {
    dow: 1,
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  },
  buttonText: {
    prev: 'Пред',
    next: 'След',
    today: 'Сегодня',
    year: 'Год',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    list: 'Повестка дня'
  },
  weekText: 'Нед',
  allDayText: 'Весь день',
  moreLinkText(n) {
    return '+ ещё ' + n;
  },
  noEventsText: 'Нет событий для отображения'
};


/***/ }),

/***/ 5660:
/*!*****************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core/index.js */ 6633);
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal.js */ 8107);




var index = (0,_fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_0__.createPlugin)({
  name: '@fullcalendar/daygrid',
  initialView: 'dayGridMonth',
  views: {
    dayGrid: {
      component: _internal_js__WEBPACK_IMPORTED_MODULE_1__.DayGridView,
      dateProfileGeneratorClass: _internal_js__WEBPACK_IMPORTED_MODULE_1__.TableDateProfileGenerator
    },
    dayGridDay: {
      type: 'dayGrid',
      duration: {
        days: 1
      }
    },
    dayGridWeek: {
      type: 'dayGrid',
      duration: {
        weeks: 1
      }
    },
    dayGridMonth: {
      type: 'dayGrid',
      duration: {
        months: 1
      },
      fixedWeekCount: true
    },
    dayGridYear: {
      type: 'dayGrid',
      duration: {
        years: 1
      }
    }
  }
});


/***/ }),

/***/ 8107:
/*!********************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/internal.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DayGridView: () => (/* binding */ DayTableView),
/* harmony export */   DayTable: () => (/* binding */ DayTable),
/* harmony export */   DayTableSlicer: () => (/* binding */ DayTableSlicer),
/* harmony export */   Table: () => (/* binding */ Table),
/* harmony export */   TableDateProfileGenerator: () => (/* binding */ TableDateProfileGenerator),
/* harmony export */   TableRows: () => (/* binding */ TableRows),
/* harmony export */   TableView: () => (/* binding */ TableView),
/* harmony export */   buildDayTableModel: () => (/* binding */ buildDayTableModel),
/* harmony export */   buildDayTableRenderRange: () => (/* binding */ buildDayTableRenderRange)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core/internal.js */ 3436);
/* harmony import */ var _fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/core/preact.js */ 8048);



/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a Table subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
class TableView extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.headerElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  }
  renderSimpleLayout(headerRowContent, bodyContent) {
    let {
      props,
      context
    } = this;
    let sections = [];
    let stickyHeaderDates = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cc)(context.options);
    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunk: {
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }
      });
    }
    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunk: {
        content: bodyContent
      }
    });
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ct, {
      elClasses: ['fc-daygrid'],
      viewSpec: context.viewSpec
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b$, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: props.forPrint,
      cols: [] /* TODO: make optional? */,
      sections: sections
    }));
  }
  renderHScrollLayout(headerRowContent, bodyContent, colCnt, dayMinWidth) {
    let ScrollGrid = this.context.pluginHooks.scrollGridImpl;
    if (!ScrollGrid) {
      throw new Error('No ScrollGrid implementation');
    }
    let {
      props,
      context
    } = this;
    let stickyHeaderDates = !props.forPrint && (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cc)(context.options);
    let stickyFooterScrollbar = !props.forPrint && (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cb)(context.options);
    let sections = [];
    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunks: [{
          key: 'main',
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }]
      });
    }
    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunks: [{
        key: 'main',
        content: bodyContent
      }]
    });
    if (stickyFooterScrollbar) {
      sections.push({
        type: 'footer',
        key: 'footer',
        isSticky: true,
        chunks: [{
          key: 'main',
          content: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ca
        }]
      });
    }
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ct, {
      elClasses: ['fc-daygrid'],
      viewSpec: context.viewSpec
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(ScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      forPrint: props.forPrint,
      collapsibleWidth: props.forPrint,
      colGroups: [{
        cols: [{
          span: colCnt,
          minWidth: dayMinWidth
        }]
      }],
      sections: sections
    }));
  }
}
function splitSegsByRow(segs, rowCnt) {
  let byRow = [];
  for (let i = 0; i < rowCnt; i += 1) {
    byRow[i] = [];
  }
  for (let seg of segs) {
    byRow[seg.row].push(seg);
  }
  return byRow;
}
function splitSegsByFirstCol(segs, colCnt) {
  let byCol = [];
  for (let i = 0; i < colCnt; i += 1) {
    byCol[i] = [];
  }
  for (let seg of segs) {
    byCol[seg.firstCol].push(seg);
  }
  return byCol;
}
function splitInteractionByRow(ui, rowCnt) {
  let byRow = [];
  if (!ui) {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = null;
    }
  } else {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = {
        affectedInstances: ui.affectedInstances,
        isEvent: ui.isEvent,
        segs: []
      };
    }
    for (let seg of ui.segs) {
      byRow[seg.row].segs.push(seg);
    }
  }
  return byRow;
}
const DEFAULT_TABLE_EVENT_TIME_FORMAT = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.x)({
  hour: 'numeric',
  minute: '2-digit',
  omitZeroMinute: true,
  meridiem: 'narrow'
});
function hasListItemDisplay(seg) {
  let {
    display
  } = seg.eventRange.ui;
  return display === 'list-item' || display === 'auto' && !seg.eventRange.def.allDay && seg.firstCol === seg.lastCol &&
  // can't be multi-day
  seg.isStart &&
  // "
  seg.isEnd // "
  ;
}
class TableBlockEvent extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      props
    } = this;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cj, Object.assign({}, props, {
      elClasses: ['fc-daygrid-event', 'fc-daygrid-block-event', 'fc-h-event'],
      defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT,
      defaultDisplayEventEnd: props.defaultDisplayEventEnd,
      disableResizing: !props.seg.eventRange.def.allDay
    }));
  }
}
class TableListItemEvent extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let {
      seg
    } = props;
    let timeFormat = options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT;
    let timeText = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bQ)(seg, timeFormat, context, true, props.defaultDisplayEventEnd);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cn, Object.assign({}, props, {
      elTag: "a",
      elClasses: ['fc-daygrid-event', 'fc-daygrid-dot-event'],
      elAttrs: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bU)(props.seg, context),
      defaultGenerator: renderInnerContent,
      timeText: timeText,
      isResizing: false,
      isDateSelecting: false
    }));
  }
}
function renderInnerContent(renderProps) {
  return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-daygrid-event-dot",
    style: {
      borderColor: renderProps.borderColor || renderProps.backgroundColor
    }
  }), renderProps.timeText && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-event-time"
  }, renderProps.timeText), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-event-title"
  }, renderProps.event.title || (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "\u00A0")));
}
class TableCellMoreLink extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  constructor() {
    super(...arguments);
    this.compileSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(compileSegs);
  }
  render() {
    let {
      props
    } = this;
    let {
      allSegs,
      invisibleSegs
    } = this.compileSegs(props.singlePlacements);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cr, {
      elClasses: ['fc-daygrid-more-link'],
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      allDayDate: props.allDayDate,
      moreCnt: props.moreCnt,
      allSegs: allSegs,
      hiddenSegs: invisibleSegs,
      alignmentElRef: props.alignmentElRef,
      alignGridTop: props.alignGridTop,
      extraDateSpan: props.extraDateSpan,
      popoverContent: () => {
        let isForcedInvisible = (props.eventDrag ? props.eventDrag.affectedInstances : null) || (props.eventResize ? props.eventResize.affectedInstances : null) || {};
        return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, allSegs.map(seg => {
          let instanceId = seg.eventRange.instance.instanceId;
          return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
            className: "fc-daygrid-event-harness",
            key: instanceId,
            style: {
              visibility: isForcedInvisible[instanceId] ? 'hidden' : ''
            }
          }, hasListItemDisplay(seg) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableListItemEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, props.todayRange))) : (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableBlockEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isResizing: false,
            isDateSelecting: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, props.todayRange))));
        }));
      }
    });
  }
}
function compileSegs(singlePlacements) {
  let allSegs = [];
  let invisibleSegs = [];
  for (let placement of singlePlacements) {
    allSegs.push(placement.seg);
    if (!placement.isVisible) {
      invisibleSegs.push(placement.seg);
    }
  }
  return {
    allSegs,
    invisibleSegs
  };
}
const DEFAULT_WEEK_NUM_FORMAT = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.x)({
  week: 'narrow'
});
class TableCell extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.rootElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.state = {
      dayNumberId: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a5)()
    };
    this.handleRootEl = el => {
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.rootElRef, el);
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.props.elRef, el);
    };
  }
  render() {
    let {
      context,
      props,
      state,
      rootElRef
    } = this;
    let {
      options,
      dateEnv
    } = context;
    let {
      date,
      dateProfile
    } = props;
    // TODO: memoize this?
    const isMonthStart = props.showDayNumber && shouldDisplayMonthStart(date, dateProfile.currentRange, dateEnv);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cl, {
      elTag: "td",
      elRef: this.handleRootEl,
      elClasses: ['fc-daygrid-day', ...(props.extraClassNames || [])],
      elAttrs: Object.assign(Object.assign(Object.assign({}, props.extraDataAttrs), props.showDayNumber ? {
        'aria-labelledby': state.dayNumberId
      } : {}), {
        role: 'gridcell'
      }),
      defaultGenerator: renderTopInner,
      date: date,
      dateProfile: dateProfile,
      todayRange: props.todayRange,
      showDayNumber: props.showDayNumber,
      isMonthStart: isMonthStart,
      extraRenderProps: props.extraRenderProps
    }, (InnerContent, renderProps) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      ref: props.innerElRef,
      className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
      style: {
        minHeight: props.minHeight
      }
    }, props.showWeekNumber && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cq, {
      elTag: "a",
      elClasses: ['fc-daygrid-week-number'],
      elAttrs: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b0)(context, date, 'week'),
      date: date,
      defaultFormat: DEFAULT_WEEK_NUM_FORMAT
    }), !renderProps.isDisabled && (props.showDayNumber || (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cm)(options) || props.forceDayTop) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-top"
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(InnerContent, {
      elTag: "a",
      elClasses: ['fc-daygrid-day-number', isMonthStart && 'fc-daygrid-month-start'],
      elAttrs: Object.assign(Object.assign({}, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b0)(context, date)), {
        id: state.dayNumberId
      })
    })) : props.showDayNumber ?
    // for creating correct amount of space (see issue #7162)
    (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-top",
      style: {
        visibility: 'hidden'
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
      className: "fc-daygrid-day-number"
    }, "\u00A0")) : undefined, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-events",
      ref: props.fgContentElRef
    }, props.fgContent, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-bottom",
      style: {
        marginTop: props.moreMarginTop
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableCellMoreLink, {
      allDayDate: date,
      singlePlacements: props.singlePlacements,
      moreCnt: props.moreCnt,
      alignmentElRef: rootElRef,
      alignGridTop: !props.showDayNumber,
      extraDateSpan: props.extraDateSpan,
      dateProfile: props.dateProfile,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      todayRange: props.todayRange
    }))), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-bg"
    }, props.bgContent)));
  }
}
function renderTopInner(props) {
  return props.dayNumberText || (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "\u00A0");
}
function shouldDisplayMonthStart(date, currentRange, dateEnv) {
  const {
    start: currentStart,
    end: currentEnd
  } = currentRange;
  const currentEndIncl = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bg)(currentEnd, -1);
  const currentFirstYear = dateEnv.getYear(currentStart);
  const currentFirstMonth = dateEnv.getMonth(currentStart);
  const currentLastYear = dateEnv.getYear(currentEndIncl);
  const currentLastMonth = dateEnv.getMonth(currentEndIncl);
  // spans more than one month?
  return !(currentFirstYear === currentLastYear && currentFirstMonth === currentLastMonth) && Boolean(
  // first date in current view?
  date.valueOf() === currentStart.valueOf() ||
  // a month-start that's within the current range?
  dateEnv.getDay(date) === 1 && date.valueOf() < currentEnd.valueOf());
}
function generateSegKey(seg) {
  return seg.eventRange.instance.instanceId + ':' + seg.firstCol;
}
function generateSegUid(seg) {
  return generateSegKey(seg) + ':' + seg.lastCol;
}
function computeFgSegPlacement(segs,
// assumed already sorted
dayMaxEvents, dayMaxEventRows, strictOrder, segHeights, maxContentHeight, cells) {
  let hierarchy = new DayGridSegHierarchy(segEntry => {
    // TODO: more DRY with generateSegUid
    let segUid = segs[segEntry.index].eventRange.instance.instanceId + ':' + segEntry.span.start + ':' + (segEntry.span.end - 1);
    // if no thickness known, assume 1 (if 0, so small it always fits)
    return segHeights[segUid] || 1;
  });
  hierarchy.allowReslicing = true;
  hierarchy.strictOrder = strictOrder;
  if (dayMaxEvents === true || dayMaxEventRows === true) {
    hierarchy.maxCoord = maxContentHeight;
    hierarchy.hiddenConsumes = true;
  } else if (typeof dayMaxEvents === 'number') {
    hierarchy.maxStackCnt = dayMaxEvents;
  } else if (typeof dayMaxEventRows === 'number') {
    hierarchy.maxStackCnt = dayMaxEventRows;
    hierarchy.hiddenConsumes = true;
  }
  // create segInputs only for segs with known heights
  let segInputs = [];
  let unknownHeightSegs = [];
  for (let i = 0; i < segs.length; i += 1) {
    let seg = segs[i];
    let segUid = generateSegUid(seg);
    let eventHeight = segHeights[segUid];
    if (eventHeight != null) {
      segInputs.push({
        index: i,
        span: {
          start: seg.firstCol,
          end: seg.lastCol + 1
        }
      });
    } else {
      unknownHeightSegs.push(seg);
    }
  }
  let hiddenEntries = hierarchy.addSegs(segInputs);
  let segRects = hierarchy.toRects();
  let {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  } = placeRects(segRects, segs, cells);
  let moreCnts = [];
  let moreMarginTops = [];
  // add segs with unknown heights
  for (let seg of unknownHeightSegs) {
    multiColPlacements[seg.firstCol].push({
      seg,
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let col = seg.firstCol; col <= seg.lastCol; col += 1) {
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  }
  // add the hidden entries
  for (let col = 0; col < cells.length; col += 1) {
    moreCnts.push(0);
  }
  for (let hiddenEntry of hiddenEntries) {
    let seg = segs[hiddenEntry.index];
    let hiddenSpan = hiddenEntry.span;
    multiColPlacements[hiddenSpan.start].push({
      seg: resliceSeg(seg, hiddenSpan.start, hiddenSpan.end, cells),
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let col = hiddenSpan.start; col < hiddenSpan.end; col += 1) {
      moreCnts[col] += 1;
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  }
  // deal with leftover margins
  for (let col = 0; col < cells.length; col += 1) {
    moreMarginTops.push(leftoverMargins[col]);
  }
  return {
    singleColPlacements,
    multiColPlacements,
    moreCnts,
    moreMarginTops
  };
}
// rects ordered by top coord, then left
function placeRects(allRects, segs, cells) {
  let rectsByEachCol = groupRectsByEachCol(allRects, cells.length);
  let singleColPlacements = [];
  let multiColPlacements = [];
  let leftoverMargins = [];
  for (let col = 0; col < cells.length; col += 1) {
    let rects = rectsByEachCol[col];
    // compute all static segs in singlePlacements
    let singlePlacements = [];
    let currentHeight = 0;
    let currentMarginTop = 0;
    for (let rect of rects) {
      let seg = segs[rect.index];
      singlePlacements.push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: true,
        isAbsolute: false,
        absoluteTop: rect.levelCoord,
        marginTop: rect.levelCoord - currentHeight
      });
      currentHeight = rect.levelCoord + rect.thickness;
    }
    // compute mixed static/absolute segs in multiPlacements
    let multiPlacements = [];
    currentHeight = 0;
    currentMarginTop = 0;
    for (let rect of rects) {
      let seg = segs[rect.index];
      let isAbsolute = rect.span.end - rect.span.start > 1; // multi-column?
      let isFirstCol = rect.span.start === col;
      currentMarginTop += rect.levelCoord - currentHeight; // amount of space since bottom of previous seg
      currentHeight = rect.levelCoord + rect.thickness; // height will now be bottom of current seg
      if (isAbsolute) {
        currentMarginTop += rect.thickness;
        if (isFirstCol) {
          multiPlacements.push({
            seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
            isVisible: true,
            isAbsolute: true,
            absoluteTop: rect.levelCoord,
            marginTop: 0
          });
        }
      } else if (isFirstCol) {
        multiPlacements.push({
          seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
          isVisible: true,
          isAbsolute: false,
          absoluteTop: rect.levelCoord,
          marginTop: currentMarginTop // claim the margin
        });
        currentMarginTop = 0;
      }
    }
    singleColPlacements.push(singlePlacements);
    multiColPlacements.push(multiPlacements);
    leftoverMargins.push(currentMarginTop);
  }
  return {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  };
}
function groupRectsByEachCol(rects, colCnt) {
  let rectsByEachCol = [];
  for (let col = 0; col < colCnt; col += 1) {
    rectsByEachCol.push([]);
  }
  for (let rect of rects) {
    for (let col = rect.span.start; col < rect.span.end; col += 1) {
      rectsByEachCol[col].push(rect);
    }
  }
  return rectsByEachCol;
}
function resliceSeg(seg, spanStart, spanEnd, cells) {
  if (seg.firstCol === spanStart && seg.lastCol === spanEnd - 1) {
    return seg;
  }
  let eventRange = seg.eventRange;
  let origRange = eventRange.range;
  let slicedRange = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.o)(origRange, {
    start: cells[spanStart].date,
    end: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(cells[spanEnd - 1].date, 1)
  });
  return Object.assign(Object.assign({}, seg), {
    firstCol: spanStart,
    lastCol: spanEnd - 1,
    eventRange: {
      def: eventRange.def,
      ui: Object.assign(Object.assign({}, eventRange.ui), {
        durationEditable: false
      }),
      instance: eventRange.instance,
      range: slicedRange
    },
    isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(),
    isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf()
  });
}
class DayGridSegHierarchy extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bA {
  constructor() {
    super(...arguments);
    // config
    this.hiddenConsumes = false;
    // allows us to keep hidden entries in the hierarchy so they take up space
    this.forceHidden = {};
  }
  addSegs(segInputs) {
    const hiddenSegs = super.addSegs(segInputs);
    const {
      entriesByLevel
    } = this;
    const excludeHidden = entry => !this.forceHidden[(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(entry)];
    // remove the forced-hidden segs
    for (let level = 0; level < entriesByLevel.length; level += 1) {
      entriesByLevel[level] = entriesByLevel[level].filter(excludeHidden);
    }
    return hiddenSegs;
  }
  handleInvalidInsertion(insertion, entry, hiddenEntries) {
    const {
      entriesByLevel,
      forceHidden
    } = this;
    const {
      touchingEntry,
      touchingLevel,
      touchingLateral
    } = insertion;
    // the entry that the new insertion is touching must be hidden
    if (this.hiddenConsumes && touchingEntry) {
      const touchingEntryId = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(touchingEntry);
      if (!forceHidden[touchingEntryId]) {
        if (this.allowReslicing) {
          // split up the touchingEntry, reinsert it
          const hiddenEntry = Object.assign(Object.assign({}, touchingEntry), {
            span: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bF)(touchingEntry.span, entry.span)
          });
          // reinsert the area that turned into a "more" link (so no other entries try to
          // occupy the space) but mark it forced-hidden
          const hiddenEntryId = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(hiddenEntry);
          forceHidden[hiddenEntryId] = true;
          entriesByLevel[touchingLevel][touchingLateral] = hiddenEntry;
          hiddenEntries.push(hiddenEntry);
          this.splitEntry(touchingEntry, entry, hiddenEntries);
        } else {
          forceHidden[touchingEntryId] = true;
          hiddenEntries.push(touchingEntry);
        }
      }
    }
    // will try to reslice...
    super.handleInvalidInsertion(insertion, entry, hiddenEntries);
  }
}
class TableRow extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.cellElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the <td>
    this.frameElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the fc-daygrid-day-frame
    this.fgElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the fc-daygrid-day-events
    this.segHarnessRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // indexed by "instanceId:firstCol"
    this.rootElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    };
    this.handleResize = isForced => {
      if (isForced) {
        this.updateSizing(true); // isExternal=true
      }
    };
  }
  render() {
    let {
      props,
      state,
      context
    } = this;
    let {
      options
    } = context;
    let colCnt = props.cells.length;
    let businessHoursByCol = splitSegsByFirstCol(props.businessHourSegs, colCnt);
    let bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt);
    let highlightSegsByCol = splitSegsByFirstCol(this.getHighlightSegs(), colCnt);
    let mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt);
    let {
      singleColPlacements,
      multiColPlacements,
      moreCnts,
      moreMarginTops
    } = computeFgSegPlacement((0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bR)(props.fgEventSegs, options.eventOrder), props.dayMaxEvents, props.dayMaxEventRows, options.eventOrderStrict, state.segHeights, state.maxContentHeight, props.cells);
    let isForcedInvisible =
    // TODO: messy way to compute this
    props.eventDrag && props.eventDrag.affectedInstances || props.eventResize && props.eventResize.affectedInstances || {};
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("tr", {
      ref: this.rootElRef,
      role: "row"
    }, props.renderIntro && props.renderIntro(), props.cells.map((cell, col) => {
      let normalFgNodes = this.renderFgSegs(col, props.forPrint ? singleColPlacements[col] : multiColPlacements[col], props.todayRange, isForcedInvisible);
      let mirrorFgNodes = this.renderFgSegs(col, buildMirrorPlacements(mirrorSegsByCol[col], multiColPlacements), props.todayRange, {}, Boolean(props.eventDrag), Boolean(props.eventResize), false);
      return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableCell, {
        key: cell.key,
        elRef: this.cellElRefs.createRef(cell.key),
        innerElRef: this.frameElRefs.createRef(cell.key) /* FF <td> problem, but okay to use for left/right. TODO: rename prop */,
        dateProfile: props.dateProfile,
        date: cell.date,
        showDayNumber: props.showDayNumbers,
        showWeekNumber: props.showWeekNumbers && col === 0,
        forceDayTop: props.showWeekNumbers /* even displaying weeknum for row, not necessarily day */,
        todayRange: props.todayRange,
        eventSelection: props.eventSelection,
        eventDrag: props.eventDrag,
        eventResize: props.eventResize,
        extraRenderProps: cell.extraRenderProps,
        extraDataAttrs: cell.extraDataAttrs,
        extraClassNames: cell.extraClassNames,
        extraDateSpan: cell.extraDateSpan,
        moreCnt: moreCnts[col],
        moreMarginTop: moreMarginTops[col],
        singlePlacements: singleColPlacements[col],
        fgContentElRef: this.fgElRefs.createRef(cell.key),
        fgContent:
        // Fragment scopes the keys
        (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, normalFgNodes), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, mirrorFgNodes)),
        bgContent:
        // Fragment scopes the keys
        (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, this.renderFillSegs(highlightSegsByCol[col], 'highlight'), this.renderFillSegs(businessHoursByCol[col], 'non-business'), this.renderFillSegs(bgEventSegsByCol[col], 'bg-event')),
        minHeight: props.cellMinHeight
      });
    }));
  }
  componentDidMount() {
    this.updateSizing(true);
    this.context.addResizeHandler(this.handleResize);
  }
  componentDidUpdate(prevProps, prevState) {
    let currentProps = this.props;
    this.updateSizing(!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.E)(prevProps, currentProps));
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  getHighlightSegs() {
    let {
      props
    } = this;
    if (props.eventDrag && props.eventDrag.segs.length) {
      // messy check
      return props.eventDrag.segs;
    }
    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }
    return props.dateSelectionSegs;
  }
  getMirrorSegs() {
    let {
      props
    } = this;
    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }
    return [];
  }
  renderFgSegs(col, segPlacements, todayRange, isForcedInvisible, isDragging, isResizing, isDateSelecting) {
    let {
      context
    } = this;
    let {
      eventSelection
    } = this.props;
    let {
      framePositions
    } = this.state;
    let defaultDisplayEventEnd = this.props.cells.length === 1; // colCnt === 1
    let isMirror = isDragging || isResizing || isDateSelecting;
    let nodes = [];
    if (framePositions) {
      for (let placement of segPlacements) {
        let {
          seg
        } = placement;
        let {
          instanceId
        } = seg.eventRange.instance;
        let isVisible = placement.isVisible && !isForcedInvisible[instanceId];
        let isAbsolute = placement.isAbsolute;
        let left = '';
        let right = '';
        if (isAbsolute) {
          if (context.isRtl) {
            right = 0;
            left = framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol];
          } else {
            left = 0;
            right = framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol];
          }
        }
        /*
        known bug: events that are force to be list-item but span multiple days still take up space in later columns
        todo: in print view, for multi-day events, don't display title within non-start/end segs
        */
        nodes.push((0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: 'fc-daygrid-event-harness' + (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''),
          key: generateSegKey(seg),
          ref: isMirror ? null : this.segHarnessRefs.createRef(generateSegUid(seg)),
          style: {
            visibility: isVisible ? '' : 'hidden',
            marginTop: isAbsolute ? '' : placement.marginTop,
            top: isAbsolute ? placement.absoluteTop : '',
            left,
            right
          }
        }, hasListItemDisplay(seg) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableListItemEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange))) : (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableBlockEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isResizing: isResizing,
          isDateSelecting: isDateSelecting,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange)))));
      }
    }
    return nodes;
  }
  renderFillSegs(segs, fillType) {
    let {
      isRtl
    } = this.context;
    let {
      todayRange
    } = this.props;
    let {
      framePositions
    } = this.state;
    let nodes = [];
    if (framePositions) {
      for (let seg of segs) {
        let leftRightCss = isRtl ? {
          right: 0,
          left: framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol]
        } : {
          left: 0,
          right: framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol]
        };
        nodes.push((0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          key: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bT)(seg.eventRange),
          className: "fc-daygrid-bg-harness",
          style: leftRightCss
        }, fillType === 'bg-event' ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cp, Object.assign({
          seg: seg
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange))) : (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.co)(fillType)));
      }
    }
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, {}, ...nodes);
  }
  updateSizing(isExternalSizingChange) {
    let {
      props,
      state,
      frameElRefs
    } = this;
    if (!props.forPrint && props.clientWidth !== null // positioning ready?
    ) {
      if (isExternalSizingChange) {
        let frameEls = props.cells.map(cell => frameElRefs.currentMap[cell.key]);
        if (frameEls.length) {
          let originEl = this.rootElRef.current;
          let newPositionCache = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(originEl, frameEls, true,
          // isHorizontal
          false);
          if (!state.framePositions || !state.framePositions.similarTo(newPositionCache)) {
            this.setState({
              framePositions: new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(originEl, frameEls, true,
              // isHorizontal
              false)
            });
          }
        }
      }
      const oldSegHeights = this.state.segHeights;
      const newSegHeights = this.querySegHeights();
      const limitByContentHeight = props.dayMaxEvents === true || props.dayMaxEventRows === true;
      this.safeSetState({
        // HACK to prevent oscillations of events being shown/hidden from max-event-rows
        // Essentially, once you compute an element's height, never null-out.
        // TODO: always display all events, as visibility:hidden?
        segHeights: Object.assign(Object.assign({}, oldSegHeights), newSegHeights),
        maxContentHeight: limitByContentHeight ? this.computeMaxContentHeight() : null
      });
    }
  }
  querySegHeights() {
    let segElMap = this.segHarnessRefs.currentMap;
    let segHeights = {};
    // get the max height amongst instance segs
    for (let segUid in segElMap) {
      let height = Math.round(segElMap[segUid].getBoundingClientRect().height);
      segHeights[segUid] = Math.max(segHeights[segUid] || 0, height);
    }
    return segHeights;
  }
  computeMaxContentHeight() {
    let firstKey = this.props.cells[0].key;
    let cellEl = this.cellElRefs.currentMap[firstKey];
    let fcContainerEl = this.fgElRefs.currentMap[firstKey];
    return cellEl.getBoundingClientRect().bottom - fcContainerEl.getBoundingClientRect().top;
  }
  getCellEls() {
    let elMap = this.cellElRefs.currentMap;
    return this.props.cells.map(cell => elMap[cell.key]);
  }
}
TableRow.addStateEquality({
  segHeights: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.E
});
function buildMirrorPlacements(mirrorSegs, colPlacements) {
  if (!mirrorSegs.length) {
    return [];
  }
  let topsByInstanceId = buildAbsoluteTopHash(colPlacements); // TODO: cache this at first render?
  return mirrorSegs.map(seg => ({
    seg,
    isVisible: true,
    isAbsolute: true,
    absoluteTop: topsByInstanceId[seg.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function buildAbsoluteTopHash(colPlacements) {
  let topsByInstanceId = {};
  for (let placements of colPlacements) {
    for (let placement of placements) {
      topsByInstanceId[placement.seg.eventRange.instance.instanceId] = placement.absoluteTop;
    }
  }
  return topsByInstanceId;
}
class TableRows extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.splitBusinessHourSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitBgEventSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitFgEventSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitDateSelectionSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitEventDrag = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitInteractionByRow);
    this.splitEventResize = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitInteractionByRow);
    this.rowRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf();
  }
  render() {
    let {
      props,
      context
    } = this;
    let rowCnt = props.cells.length;
    let businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, rowCnt);
    let bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, rowCnt);
    let fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, rowCnt);
    let dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, rowCnt);
    let eventDragByRow = this.splitEventDrag(props.eventDrag, rowCnt);
    let eventResizeByRow = this.splitEventResize(props.eventResize, rowCnt);
    // for DayGrid view with many rows, force a min-height on cells so doesn't appear squished
    // choose 7 because a month view will have max 6 rows
    let cellMinHeight = rowCnt >= 7 && props.clientWidth ? props.clientWidth / context.options.aspectRatio / 6 : null;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ch, {
      unit: "day"
    }, (nowDate, todayRange) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, props.cells.map((cells, row) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableRow, {
      ref: this.rowRefs.createRef(row),
      key: cells.length ? cells[0].date.toISOString() /* best? or put key on cell? or use diff formatter? */ : row // in case there are no cells (like when resource view is loading)
      ,
      showDayNumbers: rowCnt > 1,
      showWeekNumbers: props.showWeekNumbers,
      todayRange: todayRange,
      dateProfile: props.dateProfile,
      cells: cells,
      renderIntro: props.renderRowIntro,
      businessHourSegs: businessHourSegsByRow[row],
      eventSelection: props.eventSelection,
      bgEventSegs: bgEventSegsByRow[row].filter(isSegAllDay) /* hack */,
      fgEventSegs: fgEventSegsByRow[row],
      dateSelectionSegs: dateSelectionSegsByRow[row],
      eventDrag: eventDragByRow[row],
      eventResize: eventResizeByRow[row],
      dayMaxEvents: props.dayMaxEvents,
      dayMaxEventRows: props.dayMaxEventRows,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      cellMinHeight: cellMinHeight,
      forPrint: props.forPrint
    }))));
  }
  componentDidMount() {
    this.registerInteractiveComponent();
  }
  componentDidUpdate() {
    // for if started with zero cells
    this.registerInteractiveComponent();
  }
  registerInteractiveComponent() {
    if (!this.rootEl) {
      // HACK: need a daygrid wrapper parent to do positioning
      // NOTE: a daygrid resource view w/o resources can have zero cells
      const firstCellEl = this.rowRefs.currentMap[0].getCellEls()[0];
      const rootEl = firstCellEl ? firstCellEl.closest('.fc-daygrid-body') : null;
      if (rootEl) {
        this.rootEl = rootEl;
        this.context.registerInteractiveComponent(this, {
          el: rootEl,
          isHitComboAllowed: this.props.isHitComboAllowed
        });
      }
    }
  }
  componentWillUnmount() {
    if (this.rootEl) {
      this.context.unregisterInteractiveComponent(this);
      this.rootEl = null;
    }
  }
  // Hit System
  // ----------------------------------------------------------------------------------------------------
  prepareHits() {
    this.rowPositions = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(this.rootEl, this.rowRefs.collect().map(rowObj => rowObj.getCellEls()[0]),
    // first cell el in each row. TODO: not optimal
    false, true);
    this.colPositions = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(this.rootEl, this.rowRefs.currentMap[0].getCellEls(),
    // cell els in first row
    true,
    // horizontal
    false);
  }
  queryHit(positionLeft, positionTop) {
    let {
      colPositions,
      rowPositions
    } = this;
    let col = colPositions.leftToIndex(positionLeft);
    let row = rowPositions.topToIndex(positionTop);
    if (row != null && col != null) {
      let cell = this.props.cells[row][col];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({
          range: this.getCellRange(row, col),
          allDay: true
        }, cell.extraDateSpan),
        dayEl: this.getCellEl(row, col),
        rect: {
          left: colPositions.lefts[col],
          right: colPositions.rights[col],
          top: rowPositions.tops[row],
          bottom: rowPositions.bottoms[row]
        },
        layer: 0
      };
    }
    return null;
  }
  getCellEl(row, col) {
    return this.rowRefs.currentMap[row].getCellEls()[col]; // TODO: not optimal
  }
  getCellRange(row, col) {
    let start = this.props.cells[row][col].date;
    let end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(start, 1);
    return {
      start,
      end
    };
  }
}
function isSegAllDay(seg) {
  return seg.eventRange.def.allDay;
}
class Table extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.elRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.needsScrollReset = false;
  }
  render() {
    let {
      props
    } = this;
    let {
      dayMaxEventRows,
      dayMaxEvents,
      expandRows
    } = props;
    let limitViaBalanced = dayMaxEvents === true || dayMaxEventRows === true;
    // if rows can't expand to fill fixed height, can't do balanced-height event limit
    // TODO: best place to normalize these options?
    if (limitViaBalanced && !expandRows) {
      limitViaBalanced = false;
      dayMaxEventRows = null;
      dayMaxEvents = null;
    }
    let classNames = ['fc-daygrid-body', limitViaBalanced ? 'fc-daygrid-body-balanced' : 'fc-daygrid-body-unbalanced', expandRows ? '' : 'fc-daygrid-body-natural' // will height of one row depend on the others?
    ];
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      ref: this.elRef,
      className: classNames.join(' '),
      style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: props.clientWidth,
        minWidth: props.tableMinWidth
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("table", {
      role: "presentation",
      className: "fc-scrollgrid-sync-table",
      style: {
        width: props.clientWidth,
        minWidth: props.tableMinWidth,
        height: expandRows ? props.clientHeight : ''
      }
    }, props.colGroupNode, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("tbody", {
      role: "presentation"
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableRows, {
      dateProfile: props.dateProfile,
      cells: props.cells,
      renderRowIntro: props.renderRowIntro,
      showWeekNumbers: props.showWeekNumbers,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      businessHourSegs: props.businessHourSegs,
      bgEventSegs: props.bgEventSegs,
      fgEventSegs: props.fgEventSegs,
      dateSelectionSegs: props.dateSelectionSegs,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      dayMaxEvents: dayMaxEvents,
      dayMaxEventRows: dayMaxEventRows,
      forPrint: props.forPrint,
      isHitComboAllowed: props.isHitComboAllowed
    }))));
  }
  componentDidMount() {
    this.requestScrollReset();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dateProfile !== this.props.dateProfile) {
      this.requestScrollReset();
    } else {
      this.flushScrollReset();
    }
  }
  requestScrollReset() {
    this.needsScrollReset = true;
    this.flushScrollReset();
  }
  flushScrollReset() {
    if (this.needsScrollReset && this.props.clientWidth // sizes computed?
    ) {
      const subjectEl = getScrollSubjectEl(this.elRef.current, this.props.dateProfile);
      if (subjectEl) {
        const originEl = subjectEl.closest('.fc-daygrid-body');
        const scrollEl = originEl.closest('.fc-scroller');
        const scrollTop = subjectEl.getBoundingClientRect().top - originEl.getBoundingClientRect().top;
        scrollEl.scrollTop = scrollTop ? scrollTop + 1 : 0; // overcome border
      }
      this.needsScrollReset = false;
    }
  }
}
function getScrollSubjectEl(containerEl, dateProfile) {
  let el;
  if (dateProfile.currentRangeUnit.match(/year|month/)) {
    el = containerEl.querySelector(`[data-date="${(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bx)(dateProfile.currentDate)}-01"]`);
    // even if view is month-based, first-of-month might be hidden...
  }
  if (!el) {
    el = containerEl.querySelector(`[data-date="${(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bv)(dateProfile.currentDate)}"]`);
    // could still be hidden if an interior-view hidden day
  }
  return el;
}
class DayTableSlicer extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bW {
  constructor() {
    super(...arguments);
    this.forceDayIfListItem = true;
  }
  sliceRange(dateRange, dayTableModel) {
    return dayTableModel.sliceRange(dateRange);
  }
}
class DayTable extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.slicer = new DayTableSlicer();
    this.tableRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  }
  render() {
    let {
      props,
      context
    } = this;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(Table, Object.assign({
      ref: this.tableRef
    }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), {
      dateProfile: props.dateProfile,
      cells: props.dayTableModel.cells,
      colGroupNode: props.colGroupNode,
      tableMinWidth: props.tableMinWidth,
      renderRowIntro: props.renderRowIntro,
      dayMaxEvents: props.dayMaxEvents,
      dayMaxEventRows: props.dayMaxEventRows,
      showWeekNumbers: props.showWeekNumbers,
      expandRows: props.expandRows,
      headerAlignElRef: props.headerAlignElRef,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      forPrint: props.forPrint
    }));
  }
}
class DayTableView extends TableView {
  constructor() {
    super(...arguments);
    this.buildDayTableModel = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildDayTableModel);
    this.headerRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.tableRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    // can't override any lifecycle methods from parent
  }
  render() {
    let {
      options,
      dateProfileGenerator
    } = this.context;
    let {
      props
    } = this;
    let dayTableModel = this.buildDayTableModel(props.dateProfile, dateProfileGenerator);
    let headerContent = options.dayHeaders && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bK, {
      ref: this.headerRef,
      dateProfile: props.dateProfile,
      dates: dayTableModel.headerDates,
      datesRepDistinctDays: dayTableModel.rowCnt === 1
    });
    let bodyContent = contentArg => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(DayTable, {
      ref: this.tableRef,
      dateProfile: props.dateProfile,
      dayTableModel: dayTableModel,
      businessHours: props.businessHours,
      dateSelection: props.dateSelection,
      eventStore: props.eventStore,
      eventUiBases: props.eventUiBases,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      nextDayThreshold: options.nextDayThreshold,
      colGroupNode: contentArg.tableColGroupNode,
      tableMinWidth: contentArg.tableMinWidth,
      dayMaxEvents: options.dayMaxEvents,
      dayMaxEventRows: options.dayMaxEventRows,
      showWeekNumbers: options.weekNumbers,
      expandRows: !props.isHeightAuto,
      headerAlignElRef: this.headerElRef,
      clientWidth: contentArg.clientWidth,
      clientHeight: contentArg.clientHeight,
      forPrint: props.forPrint
    });
    return options.dayMinWidth ? this.renderHScrollLayout(headerContent, bodyContent, dayTableModel.colCnt, options.dayMinWidth) : this.renderSimpleLayout(headerContent, bodyContent);
  }
}
function buildDayTableModel(dateProfile, dateProfileGenerator) {
  let daySeries = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bO(dateProfile.renderRange, dateProfileGenerator);
  return new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bV(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}
class TableDateProfileGenerator extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.U {
  // Computes the date range that will be rendered
  buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
    let renderRange = super.buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay);
    let {
      props
    } = this;
    return buildDayTableRenderRange({
      currentRange: renderRange,
      snapToWeek: /^(year|month)$/.test(currentRangeUnit),
      fixedWeekCount: props.fixedWeekCount,
      dateEnv: props.dateEnv
    });
  }
}
function buildDayTableRenderRange(props) {
  let {
    dateEnv,
    currentRange
  } = props;
  let {
    start,
    end
  } = currentRange;
  let endOfWeek;
  // year and month views should be aligned with weeks. this is already done for week
  if (props.snapToWeek) {
    start = dateEnv.startOfWeek(start);
    // make end-of-week if not already
    endOfWeek = dateEnv.startOfWeek(end);
    if (endOfWeek.valueOf() !== end.valueOf()) {
      end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bh)(endOfWeek, 1);
    }
  }
  // ensure 6 weeks
  if (props.fixedWeekCount) {
    // TODO: instead of these date-math gymnastics (for multimonth view),
    // compute dateprofiles of all months, then use start of first and end of last.
    let lastMonthRenderStart = dateEnv.startOfWeek(dateEnv.startOfMonth((0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(currentRange.end, -1)));
    let rowCnt = Math.ceil(
    // could be partial weeks due to hiddenDays
    (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bi)(lastMonthRenderStart, end));
    end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bh)(end, 6 - rowCnt);
  }
  return {
    start,
    end
  };
}
var css_248z = ":root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:\"\";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:\"\";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}";
(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cw)(css_248z);


/***/ }),

/***/ 9857:
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ 8797:
/*!*******************************************!*\
  !*** ./node_modules/date-fns/addDays.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDays: () => (/* binding */ addDays),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 8700);
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ 6814);



/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  if (isNaN(amount)) return (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, NaN);
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDays);

/***/ }),

/***/ 6814:
/*!*************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFrom: () => (/* binding */ constructFrom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from 'date-fns'
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use contrustor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   )
 * }
 */
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructFrom);

/***/ }),

/***/ 665:
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfWeek.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfWeek: () => (/* binding */ endOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ 8700);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 9857);



/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _defaultOptions$local;
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn = (_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 || (_options$locale = options.locale) === null || _options$locale === void 0 || (_options$locale = _options$locale.options) === null || _options$locale === void 0 ? void 0 : _options$locale.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 || (_defaultOptions$local = _defaultOptions$local.options) === null || _defaultOptions$local === void 0 ? void 0 : _defaultOptions$local.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0;
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfWeek);

/***/ }),

/***/ 610:
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ 8700);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 9857);



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _defaultOptions$local;
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn = (_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 || (_options$locale = options.locale) === null || _options$locale === void 0 || (_options$locale = _options$locale.options) === null || _options$locale === void 0 ? void 0 : _options$locale.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 || (_defaultOptions$local = _defaultOptions$local.options) === null || _defaultOptions$local === void 0 ? void 0 : _defaultOptions$local.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0;
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);

/***/ }),

/***/ 8700:
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);

/***/ }),

/***/ 5839:
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_arrayEach.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
    length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayEach);

/***/ }),

/***/ 6545:
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_assignValue.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseAssignValue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseAssignValue.js */ 1878);
/* harmony import */ var _eq_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eq.js */ 7622);



/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && (0,_eq_js__WEBPACK_IMPORTED_MODULE_0__["default"])(objValue, value)) || value === undefined && !(key in object)) {
    (0,_baseAssignValue_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, key, value);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assignValue);

/***/ }),

/***/ 7467:
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseAssign.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _copyObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_copyObject.js */ 1893);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ 9892);



/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && (0,_copyObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, (0,_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(source), object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseAssign);

/***/ }),

/***/ 6408:
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_baseAssignIn.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _copyObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_copyObject.js */ 1893);
/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keysIn.js */ 5243);



/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && (0,_copyObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, (0,_keysIn_js__WEBPACK_IMPORTED_MODULE_1__["default"])(source), object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseAssignIn);

/***/ }),

/***/ 1878:
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_baseAssignValue.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_defineProperty.js */ 7797);


/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseAssignValue);

/***/ }),

/***/ 5365:
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseClone.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_Stack.js */ 2359);
/* harmony import */ var _arrayEach_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_arrayEach.js */ 5839);
/* harmony import */ var _assignValue_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_assignValue.js */ 6545);
/* harmony import */ var _baseAssign_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_baseAssign.js */ 7467);
/* harmony import */ var _baseAssignIn_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_baseAssignIn.js */ 6408);
/* harmony import */ var _cloneBuffer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_cloneBuffer.js */ 9424);
/* harmony import */ var _copyArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_copyArray.js */ 905);
/* harmony import */ var _copySymbols_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_copySymbols.js */ 9873);
/* harmony import */ var _copySymbolsIn_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_copySymbolsIn.js */ 5130);
/* harmony import */ var _getAllKeys_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_getAllKeys.js */ 6340);
/* harmony import */ var _getAllKeysIn_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_getAllKeysIn.js */ 3147);
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_getTag.js */ 1139);
/* harmony import */ var _initCloneArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_initCloneArray.js */ 5147);
/* harmony import */ var _initCloneByTag_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_initCloneByTag.js */ 6941);
/* harmony import */ var _initCloneObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_initCloneObject.js */ 3195);
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ 9247);
/* harmony import */ var _isBuffer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isBuffer.js */ 7618);
/* harmony import */ var _isMap_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./isMap.js */ 3144);
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ 3151);
/* harmony import */ var _isSet_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./isSet.js */ 1186);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./keys.js */ 9892);
/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./keysIn.js */ 5243);























/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
  CLONE_FLAT_FLAG = 2,
  CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
    isDeep = bitmask & CLONE_DEEP_FLAG,
    isFlat = bitmask & CLONE_FLAT_FLAG,
    isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    return value;
  }
  var isArr = (0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);
  if (isArr) {
    result = (0,_initCloneArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
    if (!isDeep) {
      return (0,_copyArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value, result);
    }
  } else {
    var tag = (0,_getTag_js__WEBPACK_IMPORTED_MODULE_4__["default"])(value),
      isFunc = tag == funcTag || tag == genTag;
    if ((0,_isBuffer_js__WEBPACK_IMPORTED_MODULE_5__["default"])(value)) {
      return (0,_cloneBuffer_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : (0,_initCloneObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])(value);
      if (!isDeep) {
        return isFlat ? (0,_copySymbolsIn_js__WEBPACK_IMPORTED_MODULE_8__["default"])(value, (0,_baseAssignIn_js__WEBPACK_IMPORTED_MODULE_9__["default"])(result, value)) : (0,_copySymbols_js__WEBPACK_IMPORTED_MODULE_10__["default"])(value, (0,_baseAssign_js__WEBPACK_IMPORTED_MODULE_11__["default"])(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = (0,_initCloneByTag_js__WEBPACK_IMPORTED_MODULE_12__["default"])(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack_js__WEBPACK_IMPORTED_MODULE_13__["default"]());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if ((0,_isSet_js__WEBPACK_IMPORTED_MODULE_14__["default"])(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if ((0,_isMap_js__WEBPACK_IMPORTED_MODULE_15__["default"])(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? _getAllKeysIn_js__WEBPACK_IMPORTED_MODULE_16__["default"] : _getAllKeys_js__WEBPACK_IMPORTED_MODULE_17__["default"] : isFlat ? _keysIn_js__WEBPACK_IMPORTED_MODULE_18__["default"] : _keys_js__WEBPACK_IMPORTED_MODULE_19__["default"];
  var props = isArr ? undefined : keysFunc(value);
  (0,_arrayEach_js__WEBPACK_IMPORTED_MODULE_20__["default"])(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    (0,_assignValue_js__WEBPACK_IMPORTED_MODULE_21__["default"])(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseClone);

/***/ }),

/***/ 9934:
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseCreate.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ 3151);


/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseCreate);

/***/ }),

/***/ 9842:
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseIsMap.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getTag.js */ 1139);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ 5528);



/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && (0,_getTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == mapTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsMap);

/***/ }),

/***/ 8392:
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseIsSet.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getTag.js */ 1139);
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ 5528);



/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return (0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && (0,_getTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == setTag;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseIsSet);

/***/ }),

/***/ 7225:
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseKeysIn.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ 3151);
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isPrototype.js */ 9641);
/* harmony import */ var _nativeKeysIn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_nativeKeysIn.js */ 4767);




/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!(0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object)) {
    return (0,_nativeKeysIn_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object);
  }
  var isProto = (0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object),
    result = [];
  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseKeysIn);

/***/ }),

/***/ 2279:
/*!*****************************************************!*\
  !*** ./node_modules/lodash-es/_cloneArrayBuffer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Uint8Array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Uint8Array.js */ 6270);


/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array_js__WEBPACK_IMPORTED_MODULE_0__["default"](result).set(new _Uint8Array_js__WEBPACK_IMPORTED_MODULE_0__["default"](arrayBuffer));
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneArrayBuffer);

/***/ }),

/***/ 9424:
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_cloneBuffer.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ 911);


/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Buffer : undefined,
  allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
    result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneBuffer);

/***/ }),

/***/ 3823:
/*!**************************************************!*\
  !*** ./node_modules/lodash-es/_cloneDataView.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneArrayBuffer.js */ 2279);


/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? (0,_cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneDataView);

/***/ }),

/***/ 2591:
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_cloneRegExp.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneRegExp);

/***/ }),

/***/ 8229:
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_cloneSymbol.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ 9091);


/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneSymbol);

/***/ }),

/***/ 8295:
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_cloneTypedArray.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneArrayBuffer.js */ 2279);


/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? (0,_cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneTypedArray);

/***/ }),

/***/ 905:
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_copyArray.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
    length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copyArray);

/***/ }),

/***/ 1893:
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_copyObject.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assignValue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_assignValue.js */ 6545);
/* harmony import */ var _baseAssignValue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseAssignValue.js */ 1878);



/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
    length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      (0,_baseAssignValue_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, key, newValue);
    } else {
      (0,_assignValue_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, key, newValue);
    }
  }
  return object;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copyObject);

/***/ }),

/***/ 9873:
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_copySymbols.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _copyObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_copyObject.js */ 1893);
/* harmony import */ var _getSymbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getSymbols.js */ 7482);



/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return (0,_copyObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, (0,_getSymbols_js__WEBPACK_IMPORTED_MODULE_1__["default"])(source), object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copySymbols);

/***/ }),

/***/ 5130:
/*!**************************************************!*\
  !*** ./node_modules/lodash-es/_copySymbolsIn.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _copyObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_copyObject.js */ 1893);
/* harmony import */ var _getSymbolsIn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getSymbolsIn.js */ 9309);



/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return (0,_copyObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, (0,_getSymbolsIn_js__WEBPACK_IMPORTED_MODULE_1__["default"])(source), object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copySymbolsIn);

/***/ }),

/***/ 7797:
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_defineProperty.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getNative_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_getNative.js */ 4740);

var defineProperty = function () {
  try {
    var func = (0,_getNative_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defineProperty);

/***/ }),

/***/ 3147:
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_getAllKeysIn.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetAllKeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseGetAllKeys.js */ 8705);
/* harmony import */ var _getSymbolsIn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_getSymbolsIn.js */ 9309);
/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keysIn.js */ 5243);




/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return (0,_baseGetAllKeys_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, _keysIn_js__WEBPACK_IMPORTED_MODULE_1__["default"], _getSymbolsIn_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAllKeysIn);

/***/ }),

/***/ 2549:
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_getPrototype.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _overArg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_overArg.js */ 9093);


/** Built-in value references. */
var getPrototype = (0,_overArg_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object.getPrototypeOf, Object);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPrototype);

/***/ }),

/***/ 9309:
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_getSymbolsIn.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayPush_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_arrayPush.js */ 9126);
/* harmony import */ var _getPrototype_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_getPrototype.js */ 2549);
/* harmony import */ var _getSymbols_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_getSymbols.js */ 7482);
/* harmony import */ var _stubArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stubArray.js */ 1971);





/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? _stubArray_js__WEBPACK_IMPORTED_MODULE_0__["default"] : function (object) {
  var result = [];
  while (object) {
    (0,_arrayPush_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result, (0,_getSymbols_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object));
    object = (0,_getPrototype_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object);
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSymbolsIn);

/***/ }),

/***/ 5147:
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_initCloneArray.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
    result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initCloneArray);

/***/ }),

/***/ 6941:
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_initCloneByTag.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneArrayBuffer.js */ 2279);
/* harmony import */ var _cloneDataView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_cloneDataView.js */ 3823);
/* harmony import */ var _cloneRegExp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_cloneRegExp.js */ 2591);
/* harmony import */ var _cloneSymbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_cloneSymbol.js */ 8229);
/* harmony import */ var _cloneTypedArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_cloneTypedArray.js */ 8295);






/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return (0,_cloneArrayBuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
    case boolTag:
    case dateTag:
      return new Ctor(+object);
    case dataViewTag:
      return (0,_cloneDataView_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, isDeep);
    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return (0,_cloneTypedArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object, isDeep);
    case mapTag:
      return new Ctor();
    case numberTag:
    case stringTag:
      return new Ctor(object);
    case regexpTag:
      return (0,_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object);
    case setTag:
      return new Ctor();
    case symbolTag:
      return (0,_cloneSymbol_js__WEBPACK_IMPORTED_MODULE_4__["default"])(object);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initCloneByTag);

/***/ }),

/***/ 3195:
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_initCloneObject.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseCreate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseCreate.js */ 9934);
/* harmony import */ var _getPrototype_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_getPrototype.js */ 2549);
/* harmony import */ var _isPrototype_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPrototype.js */ 9641);




/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return typeof object.constructor == 'function' && !(0,_isPrototype_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object) ? (0,_baseCreate_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_getPrototype_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object)) : {};
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initCloneObject);

/***/ }),

/***/ 4767:
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_nativeKeysIn.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nativeKeysIn);

/***/ }),

/***/ 5237:
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/cloneDeep.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseClone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseClone.js */ 5365);


/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
  CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return (0,_baseClone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloneDeep);

/***/ }),

/***/ 3144:
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/isMap.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseIsMap.js */ 9842);
/* harmony import */ var _baseUnary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseUnary.js */ 5583);
/* harmony import */ var _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_nodeUtil.js */ 4695);




/* Node.js helper references. */
var nodeIsMap = _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"] && _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? (0,_baseUnary_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nodeIsMap) : _baseIsMap_js__WEBPACK_IMPORTED_MODULE_2__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isMap);

/***/ }),

/***/ 1186:
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/isSet.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsSet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseIsSet.js */ 8392);
/* harmony import */ var _baseUnary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseUnary.js */ 5583);
/* harmony import */ var _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_nodeUtil.js */ 4695);




/* Node.js helper references. */
var nodeIsSet = _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"] && _nodeUtil_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? (0,_baseUnary_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nodeIsSet) : _baseIsSet_js__WEBPACK_IMPORTED_MODULE_2__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSet);

/***/ }),

/***/ 5243:
/*!******************************************!*\
  !*** ./node_modules/lodash-es/keysIn.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_arrayLikeKeys.js */ 8165);
/* harmony import */ var _baseKeysIn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseKeysIn.js */ 7225);
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArrayLike.js */ 8200);




/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return (0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object) ? (0,_arrayLikeKeys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, true) : (0,_baseKeysIn_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keysIn);

/***/ })

}]);
//# sourceMappingURL=55.dc4777300818b86d.js.map