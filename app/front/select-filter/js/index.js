(function() {
  "use strict";

  var app = angular.module("myApp", ["ngTable", "ngTableDemos"]);

  app.controller("demoController", demoController);
  
  demoController.$inject = ["NgTableParams", "ngTableSimpleMediumList", "ngTableDemoCountries", "$q"];
  
  function demoController(NgTableParams, simpleList, countries, $q) {
    this.countries = countries;
    this.countriesAsync = $q.when(countries);
    this.tableParams = new NgTableParams({}, {
      dataset: simpleList
    });
    
    this.getDatasource = getDatasource;
    this.getCountries = getCountries;
    this.getCountriesAsync = getCountriesAsync;
    
    function getCountries(){
      return countries;
    }
    function getCountriesAsync(){
      return $q.when(countries);
    }
    function getDatasource($column){
      if ($column.title() === "dynamic datasource") {
        return [{ id: 55, title: "55"}, { id: 56, title: "56"}];
      }
    }
  }
  
  
  app.controller("dynamicDemoController", dynamicDemoController);
  
  dynamicDemoController.$inject = ["NgTableParams", "ngTableSimpleMediumList", "ngTableDemoCountries", "$q"];
  
  function dynamicDemoController(NgTableParams, simpleList, countries, $q) {
    this.cols = [
      { field: "country", title: "array", filter: { country: "select" }, filterData: countries, show: true },
      { field: "country", title: "promise>array", filter: { country: "select" }, filterData: $q.when(countries), show: true },
      { field: "country", title: "fn>array", filter: { country: "select" }, filterData: getCountries, show: true },
      { field: "country", title: "fn>promise>array", filter: { country: "select" }, filterData: getCountriesAsync, show: true },
      { field: "age", title: "dynamic datasource", filter: { age: "select" }, filterData: getDatasource, show: true }
    ];
    
    this.tableParams = new NgTableParams({
      // initial sort order
      filter: { country: "Ecuador" } 
    }, {
      dataset: simpleList
    });
    
    function getCountries(){
      return countries;
    }
    function getCountriesAsync(){
      return $q.when(countries);
    }
    function getDatasource(){
      if (this.field === "age") {
        return [{ id: 55, title: "55"}, { id: 56, title: "56"}];
      }
    }
  }
})();

(function() {
  "use strict";

  angular.module("myApp").run(setRunPhaseDefaults);
  setRunPhaseDefaults.$inject = ["ngTableDefaults"];

  function setRunPhaseDefaults(ngTableDefaults) {
    ngTableDefaults.params.count = 5;
    ngTableDefaults.settings.counts = [];
  }
})();