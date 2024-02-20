import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnectivity = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected && netInfoState.isInternetReachable;
};