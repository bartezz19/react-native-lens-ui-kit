import { useState, useEffect } from 'react'
import {
  View, TouchableHighlight, StyleSheet, Image, Text
} from 'react-native'
import { client } from '../api'
import { ProfileDocument } from '../graphql/generated'
import { ExtendedProfile, ProfileHeaderStyles } from '../types'

export function ProfileHeader({
  profileId = null,
  profile: user = null,
  onFollowingPress = profile => console.log({ profile }),
  onFollowersPress = profile => console.log({ profile }),
  styles = baseStyles,
}: {
  profileId?: number,
  profile?: ExtendedProfile,
  onFollowingPress: any,
  onFollowersPress: any,
  styles?: ProfileHeaderStyles
}) {
  const [fetchedProfile, setFetchedProfile] = useState<any | null>(null)
  useEffect(() => {
    if (!profile) {
      fetchProfile()
    }
  })
  async function fetchProfile() {
    console.log("FETCHING PROFILE")
    try {
      const { data: { profile: userProfile }} = await client.query(ProfileDocument, {
        request: {
          profileId
        }
      }).toPromise()
      setFetchedProfile(userProfile)
    } catch (err) {
        console.log('error fetching profile: ', err)
      }
    }
    if (!user && !fetchedProfile) return null
    const profile = user || fetchedProfile
    let { picture, coverPicture } = profile
    if (picture && picture.original) {
      if (picture.original.url.startsWith('ipfs://')) {
        let result = picture.original.url.substring(7, picture.original.url.length)
        profile.picture.original.url = `https://lens.infura-ipfs.io/ipfs/${result}`
      }
    } else {
      profile.missingAvatar = true
    }
    if (coverPicture && coverPicture.original.url) {
      if (coverPicture.original.url.startsWith('ipfs://')) {
        let hash = coverPicture.original.url.substring(7, coverPicture.original.url.length)
        profile.coverPicture.original.url = `https://lens.infura-ipfs.io/ipfs/${hash}`
      }
    } else {
      profile.missingCover = true
  }

  return (
    <View style={styles.container}>
      {
        profile.missingCover ? (
          <View
            style={styles.blankHeader}
          />
        ) : (
          <Image
            style={styles.headerImage}
            source={{ uri: profile.coverPicture.original.url }}
          />
        )
      }
      {
        profile.missingAvatar ? (
          <View />
        ) : (
          <Image
            style={styles.avatar}
            source={{ uri: profile.picture.original.url}}
          />
        )
      }
      <View style={styles.userDetails}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.handle}>{profile.handle}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <View style={styles.profileStats}>
          <TouchableHighlight
            onPress={() => onFollowingPress(profile)}
            underlayColor="transparent"
          >
            <View style={styles.profileFollowingData}>
              <Text style={styles.statsData}>{profile.stats.totalFollowing}</Text>
              <Text style={styles.statsHeader}>Following</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => onFollowersPress(profile)}
            underlayColor="transparent"
          >
            <View style={styles.profileFollowerData}>
              <Text style={styles.statsData}>{profile.stats.totalFollowers}</Text>
              <Text style={styles.statsHeader}>Followers</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

const baseStyles = StyleSheet.create({
  container: {},
  blankHeader: {
    height: 120,
    backgroundColor: 'black'
  },
  headerImage: {
    width: '100%',
    height: 120
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    marginLeft: 25
  },
  userDetails: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
  },
  handle: {
    fontSize: 14,
  },
  bio: {
    marginTop: 10,
    color: 'rgba(0, 0, 0, .5)'
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 15
  },
  statsData: {
    fontWeight: '600',
    fontSize: 16,
  },
  statsHeader: {
    marginLeft: 3,
    opacity: .7
  },
  profileFollowingData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileFollowerData: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
})