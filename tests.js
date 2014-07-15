describe("Midway: Testing API Service", function() {

  var tester, $Service;


  beforeEach(function() {
    if(tester) {
      tester.destroy();
    }
    tester = ngMidwayTester('Interface');
    var timeFormat = /^\d{4}\-\d{2}\-\d{2}\T\d{2}\:\d{2}\:\d{2}$/;  
    var readingFormat = /^[A-Za-z]{18}\-[A-Za-z]{2}\-[A-Za-z0-9]{4}\-[A-Za-z0-9]{6}\-[0-9]{12}$/;
    var item = {
      id: '0000',
      name: 'name'
    };

    $Service = tester.inject('Service');
  });


describe("hasBeenUpdated", function(){

  it('should perform a http operation to the api and check for recent update time', function(done) {

    $Service.hasBeenUpdated()
    .success(function(data){
      data.data.forEach(function(entry) {
        expect(entry.last_updated).to.match(timeFormat);
      });
      done();
    })
    .error(function(data){
      done();
    });
  });

});

describe("getData", function() {


  it('should get the name', function(done) {

    $Service.getData(item.id)
    .success(function(data){
      data.results.forEach(function(entry) {
        expect(entry.name).to.equal(item.name);
      });
      done();
    })
    .error(function(data){
      done();
    });
  });

  it('should get the id', function(done) {

    $Service.getData(item.id)
    .success(function(data, status){
      data.results.forEach(function(entry) {
        expect(entry.item_id).to.equal(item.id);
      });
      expect(status).to.equal(200);
      done();
    })
    .error(function(data){
      done();
    });
  });

  it('should get the readings', function(done) {

    $Service.getData(deviceObj.id)
    .success(function(data){
      data.results.forEach(function(entry) {
        expect(entry.readings).to.match(readingFormat);
      });
      done();
    })
    .error(function(data){
      done();
    });
  });

});