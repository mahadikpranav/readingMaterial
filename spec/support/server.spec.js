const { response } = require('express');
var Request = require('request');
var server = require('../../server');


describe("GET /", () =>{
   var data ={};
    beforeAll((done)=>{
        Request.get("http://localhost:5002/", (error, response, body)=>{
            data.statusCode = response.statusCode;
            data.body = body;
            
            done();
        });
    });
    it("Status 200", ()=>{
        expect(data.statusCode).toBe(200);
    });
    it("Body not Empty", ()=>{
        expect(data.body).not.toBe(" ");
    });
});