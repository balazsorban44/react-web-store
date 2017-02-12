// Copy this to http://www.json-generator.com/ for a random  json database.

[
  '{{repeat(200)}}',
  {
    id: '{{integer(100000, 999999)}}',
    cat: function (tags) {
      var categoryList = ['lorem', 'ipsum', 'dolor','sit','amet'];
      return categoryList[tags.integer(0, categoryList.length - 1)];
    },
    name: '{{lorem(1,"words")}}',
    desc: '{{lorem(2)}}',
    price: '{{integer(19, 3490)}}',
    quantity: '{{integer(0,100)}}'

  }
]
