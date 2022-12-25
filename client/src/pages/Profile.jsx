import { useState, useContext, useEffect } from "react";
import { useStateContext } from "../context"
import { DisplayCampaigns } from "../components";
const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const {address, contract,getUserCompaigns} = useStateContext();
  const fetchCampaigns = async () => {
    setLoading(true);
    const data = await getUserCompaigns();
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

export default Profile