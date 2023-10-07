import * as express from 'express';
import * as axios from 'axios';
import { AbstractController } from './types/abstracts';
import ErrorProcessor from './utils/ErrorProcessor';
import Service from './Service';
import _1CService from './_1CService';

export default class Controller extends ErrorProcessor implements AbstractController {
    private readonly authorizedHttpHeaders: axios.RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        apikey: process.env.API_KEY,
    };

    private service: Service;
    private _1Cservice: _1CService;

    constructor(service: Service, _1Cservice: _1CService) {
        super();

        this.service = service;
		this._1Cservice = _1Cservice;
    }

    public getService = this.catchAsync(async (req, res, next) => {});
}
