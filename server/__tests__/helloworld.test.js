/* eslint-disable no-undef */
// Import required modules
import request from 'supertest';
import {app} from '../server';
import { jest } from '@jest/globals';
// eslint-disable-next-line no-unused-vars
import DB from '../db/db';
jest.mock('../db/db');

describe('Hardcoded Unit Tests', () => {
  test('Force Pass', () => {
    expect(1).toBe(1);
  });

  //Test to confirm if CI-CD pipeline works
  /*
  test('Force Fail', () => {
    expect(1).toBe(69420);
  });
  */
});

describe('Test helloworld Endpoint', () => {
  test('should get helloworld successfully', async () => {
    const response = await request(app).get('/api/helloworld');
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toEqual('hello world!');
  });
});
