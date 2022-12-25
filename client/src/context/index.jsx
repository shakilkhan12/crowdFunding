import React, { useContext, createContext, useEffect } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider =  ({ children }) => {
  const { contract, isLoading, error } =  useContract('0x522fcFd2324c470C494a88bEAD1a6C7296cCf7C4','custom');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }
  const getUserCompaigns = async () => {
    const allCompaigns = await getCampaigns();
    const filtered = allCompaigns.filter(compaign => compaign.owner === address);
    return filtered;
  }
const donate = async (pId, amount) => {
  const data = await contract.call('donateToCampaign', pId, {
    value: ethers.utils.parseEther(amount)
  });
  return data;
}
const getDonations = async pId => {
  const donations = await contract.call('getDonators', pId);
  const numberOfDonations = donations[0].length;
  const parsedDonations = [];
  for( let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString())
    })
  }
  return parsedDonations
}
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        isLoading,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCompaigns,
        donate,
        getDonations

      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);