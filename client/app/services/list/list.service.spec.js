'use strict';

describe('Service: list', function () {

  // load the service's module
  beforeEach(module('applicationApp'));

  // instantiate service
  var list;
  beforeEach(inject(function (_list_) {
    list = _list_;
  }));

  it('should do something', function () {
    expect(!!list).toBe(true);
  });

});
