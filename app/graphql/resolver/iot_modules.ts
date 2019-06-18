import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {gql_resolver_query_devices, IoTHubDeviceInputType} from '../../helper/iot_modules_helper';//'../../helper/iot_modules_helper';
import {Device} from 'azure-iothub';
import {schema_IotHubModules} from '../schema/iot_modules_schema';
let pubsub = new PubSub();

export default {
  resolvers: {
    Query: {
      // get devices
      devices: (root: any, {input}: any, {connectionString}: any) => {
        return gql_resolver_query_devices(input, connectionString);
      },
    },
    Mutation: {
      // create a post
      upsertDevice:  async (root: any, { input }: any, context: any) => {
          return null;
      },
    },
    Subscription: {
        deviceUpserted: {
        subscribe: (root:any, args:any, context:any) => {
          return pubsub.asyncIterator('deviceUpserted');
        },
      },
    }
    // ,
    // Post: {
    //   user: (post: Partial<GQL.Post>) => getPublicUser(post.userId),
    // },
  },
  typeDefs: [schema_IotHubModules],
};