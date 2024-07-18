import { Avatar } from "@/components/Avatar"
import BaseIcon from "@/components/BaseIcon"
import { Icon } from "@aws-amplify/ui-react"
import { mdiAccount, mdiFaceManOutline, mdiFaceManProfile } from "@mdi/js"

export function TeamMemberCard({ member }) {
    return <>
        <div className="rounded-2xl  px-8 py-10 text-center  bg-gray-800 flex flex-col items-center justify-center space-y-20">
            {member.pic ? <Avatar avatar={member.pic} className="rounded-full w-44 h-44 bg-cover" username="" /> : <BaseIcon
                path={mdiAccount}
                size="100"
                w="w-44"
                h="h-44"
                className="bg-white rounded-full w-44 h-44 text-whites"
            />}

            <div className="flex flex-col justify-center items-center space-y-10">
                <p className="font-semibold text-sm text-white">{`${member.fname} ${member.lname}`}</p>
                <p className="font-semibold text-xs text-white">{member.zir_onvan}</p>
            </div>
        </div>
    </>
}