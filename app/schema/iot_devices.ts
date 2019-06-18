import { PubSub } from 'graphql-subscriptions';
import { gql } from 'apollo-server';
import {list_devices} from '../helper/iot_devices_helper';
import {Device} from 'azure-iothub';

let pubsub = new PubSub();

const typeDefs = gql`
  extend type Query {
    " get all devices "
    devices: [IoTHubDeviceType]
  }

  extend type Mutation {
    " add or update an IoT Device "
    upsertDevice(input: IoTHubDeviceInputType!): IoTHubDeviceType
  }

  extend type Subscription {
    " called when a new post is created "
    deviceUpserted: IoTHubDeviceType
  }

  " input to create a new post "
  input IoTHubDeviceInputType {
    text: String
  }
  type IoTHubDeviceCapabilitityType{
    iotEdge: Boolean
  }
  type IoTHubDeviceType {
    deviceId: String
    generationId: String
    etag: String
    connectionState: String
    status: String
    statusReason: String
    connectionStateUpdatedTime: String
    statusUpdatedTime: String
    lastActivityTime: String
    cloudToDeviceMessageCount: Int
    capabilities: IoTHubDeviceCapabilitityType
    authentication: IoTHubDeviceAuthenticationType
  }
  type IoTHubDeviceKeyPairType{
    primaryKey: String
    secondaryKey: String
  }
  type IoTHubDeviceAuthenticationType
  { 
    symmetricKey: IoTHubDeviceKeyPairType
    x509Thumbprint: IoTHubDeviceThumbprintType
    type: String
  }
  type IoTHubDeviceThumbprintType {
    primaryThumbprint: String
    secondaryThumbprint: String
  }
`;


export default {
  resolvers: {
    Query: {
      // get devices
      devices: (root: any, { input }: any, {connectionString}: any) => {
        return list_devices(connectionString);
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
  typeDefs: [typeDefs],
};
