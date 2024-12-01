import { asyncHandler } from "../utils/asynchandler.js";
import {Subscription} from "../models/subscription.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const subscriberId=req.user._id
    const deletedSubscription=await Subscription.findOneAndDelete({
        channel:channelId,
        subscriber:channelId
    })
    if(!deletedSubscription){

        const subscription=await Subscription.create({
            channel:channelId,
            subscriber:subscriberId
        })
        return true
    }
     
    return false



    // TODO: toggle subscription
})

const getUserChannelSubscribers=asyncHandler(async(req,res)=>{
    const {channelId}=req.params
    if(!channelId) throw new ApiError(401,"Channel Id is required")
    const listOfSubscribers=await Subscription.find({channel:channelId}).toArray();
    return res.status(201).json(
        new ApiResponse(201,listOfSubscribers,"Subscribe list is generated")
    )

})

const getSubscribedChannel=asyncHandler(async(req,res)=>{
    const {subscriberId}=req.params

    if(!subscriberId) throw new ApiError(401,"subscriberId Id is required")
        const listOfSubscribedChannels=await Subscription.find({subscriber:subscriberId}).toArray();
        return res.status(201).json(
            new ApiResponse(201,listOfSubscribedChannels,"Subscribed list is generated")
        )


})

export {
    getUserChannelSubscribers,
    getSubscribedChannel,
    toggleSubscription
}