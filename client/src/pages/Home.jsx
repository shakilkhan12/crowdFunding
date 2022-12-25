import { useState, useContext, useEffect } from "react";
import { useStateContext } from "../context"
import { DisplayCampaigns } from "../components";
const Home = () => {
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const {address, contract,getCampaigns} = useStateContext();
  const fetchCampaigns = async () => {
    setLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setLoading(false);
  }
  console.log(campaigns)
  useEffect(() => {
    if(address) {
      fetchCampaigns();
    }
  },[address,contract])
  return (
    <DisplayCampaigns title="All Campaigns" isLoading={loading} campaigns={campaigns} />
  )
}

export default Home