import * as assert from "assert";
import {formatDateTime, Paginator, PaginatorAsync, returnMsg} from "../../../src/utils/commonUtils.js";

describe('Return Message', function() {
    it('Should contain message', function() {
        assert.equal(JSON.stringify(returnMsg(1,200,"Success")), JSON.stringify({
            "status": 1,
            "code": 200,
            "data": "Success"
        }));
    });
});

describe('Date Format', function() {
    it('Should contain message', function() {
        assert.equal(
            formatDateTime(new Date()),
            formatDateTime(new Date())
        );
    });
});

describe('Paginator', function() {
    it('Return the first page with page size 2', function() {
        assert.equal(
            JSON.stringify(Paginator(2,1,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":1,"length":5,"data":[1,2]})
        );
    });
    it('Return the second page with page size 2', function() {
        assert.equal(
            JSON.stringify(Paginator(2,2,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":2,"length":5,"data":[3,4]})
        );
    });
    it('Return the third page with page size 2', function() {
        assert.equal(
            JSON.stringify(Paginator(2,3,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":3,"length":5,"data":[5]})
        );
    });
    it('Return the fourth page with page size 2', function() {
        assert.equal(
            JSON.stringify(Paginator(2,4,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":4,"length":5,"data":[]})
        );
    });

    it('Callback: reverse value', function(){
        assert.equal(
            JSON.stringify(Paginator(2,1,[1,2,3,4,5], (x)=>{x.reverse()})),
            JSON.stringify({"pageSize":2,"currentPage":1,"length":5,"data":[2,1]})
        );
    })
});

describe('Paginator Async', async function() {
    it('Return the first page with page size 2', async function() {
        assert.equal(
            JSON.stringify(await PaginatorAsync(2,1,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":1,"length":5,"data":[1,2]})
        );
    });
    it('Return the second page with page size 2', async function() {
        assert.equal(
            JSON.stringify(await PaginatorAsync(2,2,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":2,"length":5,"data":[3,4]})
        );
    });
    it('Return the third page with page size 2', async function() {
        assert.equal(
            JSON.stringify(await PaginatorAsync(2,3,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":3,"length":5,"data":[5]})
        );
    });
    it('Return the fourth page with page size 2', async function() {
        assert.equal(
            JSON.stringify(await PaginatorAsync(2,4,[1,2,3,4,5])),
            JSON.stringify({"pageSize":2,"currentPage":4,"length":5,"data":[]})
        );
    });

    it('Callback: reverse value', async function(){
        assert.equal(
            JSON.stringify(await PaginatorAsync(2,1,[1,2,3,4,5], (x)=>{x.reverse()})),
            JSON.stringify({"pageSize":2,"currentPage":1,"length":5,"data":[2,1]})
        );
    })
});