'use strict';
/* global instantsearch */

var search = instantsearch({
  appId: 'ZRBTGGQ7F5',
  apiKey: 'c08f135b69f45ff4d205b5871f88439c',
  indexName: 'abigdealprod'
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Search product opportunities'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.on('render', function() {
  $('.product-picture img').addClass('transparent');
  $('.product-picture img').one('load', function() {
      $(this).removeClass('transparent');
  }).each(function() {
      if(this.complete) $(this).load();
  });
});

var hitTemplate =
  '<article class="hit">' +
      '<div class="product-desc-wrapper">' +
      '<div class="product-name">{{{Product Name}}}</div>' +
      '<div class="product-type">{{{Category}}}</div>' +
      '<div class="product-price">Sales Price per item: €{{{Price}}}</div>' +
'</br>'+
      '<div class="product-price">Fees per item: - €{{{Fees}}}</div>' +
'</br>'+
'<div class="product-price">Net Profit per item: €{{{Net}}} </div>' +
'</br>'+
    '<div class="product-price">Monthly Sales: x {{{MonthlySales}}}</div>' +
'</br>'+
    '<div class="product-price">----------------------------------</div>' +
'</br>'+
    '<div class="product-price">Est. monthly total Net Profit: <b>€{{{NetProfit}}} </b></div>' +
'</br>'+
    '<div class="product-price">----------------------------------</div>' +
'</br>'+
'<div class="product-price">Est. monthly total ROI: <b>{{{NetProfit}}}% </b></div>' +
'</br>'+
'<div class="product-price">----------------------------------</div>' +
'</br>'+
'<div class="product-price">Total funding required from investors to begin production: <b>{{{Fees}}}*{{{MonthlySales}}} </b></div>' +

'</br>'+
'</br>'+

'<iframe height="220" allowTransparency="true" frameborder="0" scrolling="no" style="width:100%;border:none"  src="https://teaandme.wufoo.com/embed/rp5ux3n070o907/"><a href="https://teaandme.wufoo.com/forms/rp5ux3n070o907/">Fill out my Wufoo form!</a></iframe></div>' +

'<div class="product-price"><a href="https://www.amazon.co.uk/gp/product/{{{ASIN}}}" class="btn btn-default"">View product on Amazon</a></div>'+



'<div class="sharethis-inline-share-buttons"></div>'+

'</br>'+


      '</div>' +
  '</article>';



var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> ab {{{Rating}}}</span class="facet-name"></a>';

var facetTemplateCheckbox =
'<a href="javascript:void(0);" class="facet-item">' +
'<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{Rating}}" {{#isRefined}}checked{{/isRefined}} />' + '<div>{{{Rating}}}/5 </div>' +
'</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{{Rating}}}" class="facet-item {{#isRefined}}active{{/isRefined}}">{{{Rating}}}</a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 16,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
    },
    showFirstLast: false
  })
);







search.addWidget(
                 instantsearch.widgets.numericRefinementList({
                                                             container: '#reviews',
                                                             attributeName: 'Reviews',
                                                             options: [
                                                                       {name: 'All'},
                                                                
                                                                       {start: 0, end: 20, name: 'under 20 reviews'},
                                                                       {start: 21, end: 50, name: 'between 20 - 50 reviews'},
                                                                       {start: 51, end: 100, name: 'between 50 - 100 reviews'},
                                                                       {start: 101, end: 200, name: 'between 100 - 200 reviews'},
                                                                       {start: 201, end: 300, name: 'between 200 - 300 reviews'},
                                                                        {start: 301, end: 3111100, name: 'over 300 reviews'}
                                                                    
                                                                       ],
                                                             templates: {
                                                             header: 'Reviews: lower is better, it is easier to rank against this product on Amazon.'
                                                             }
                                                             })
                 );

search.addWidget(
                 instantsearch.widgets.numericRefinementList({
                                                             container: '#difficulty',
                                                             attributeName: 'Sales/Reviews',
                                                             options: [
                                                                       {name: 'All'},
                                                                       
                                                                     
                                                                       {start: 3, end: 10, name: 'between 3 - 10'},
                                                                       {start: 10, end: 20, name: 'between 10 - 20'},
                                                                       {start: 20, end: 30, name: 'between 20 - 30'},
                                                                       {start: 30, end: 3000000000, name: 'Over 30'}
                                                                
                                                                       
                                                                       ],
                                                             templates: {
                                                             header: 'Difficulty to rank against competition:  Greater than 3 is required.'
                                                             }
                                                             })
                 );






search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: true
  })
);

search.start();
