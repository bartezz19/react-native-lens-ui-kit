import { jsx as _jsx } from "react/jsx-runtime";
import { Feed, ProfileHeader } from './';
export function Profile(_a) {
    var profile = _a.profile, _b = _a.ListHeaderComponent, ListHeaderComponent = _b === void 0 ? null : _b, _c = _a.ListFooterComponent, ListFooterComponent = _c === void 0 ? null : _c, _d = _a.feed, feed = _d === void 0 ? null : _d, _e = _a.signedInUser, signedInUser = _e === void 0 ? null : _e, _f = _a.onCollectPress, onCollectPress = _f === void 0 ? function () { } : _f, _g = _a.onCommentPress, onCommentPress = _g === void 0 ? function () { } : _g, _h = _a.onMirrorPress, onMirrorPress = _h === void 0 ? function () { } : _h, _j = _a.onLikePress, onLikePress = _j === void 0 ? function () { } : _j, _k = _a.hideLikes, hideLikes = _k === void 0 ? false : _k, _l = _a.hideComments, hideComments = _l === void 0 ? false : _l, _m = _a.hideMirrors, hideMirrors = _m === void 0 ? false : _m, _o = _a.hideCollects, hideCollects = _o === void 0 ? false : _o, _p = _a.infiniteScroll, infiniteScroll = _p === void 0 ? true : _p, _q = _a.onEndReachedThreshold, onEndReachedThreshold = _q === void 0 ? .7 : _q, _r = _a.onFollowingPress, onFollowingPress = _r === void 0 ? null : _r, _s = _a.onFollowersPress, onFollowersPress = _s === void 0 ? null : _s, _t = _a.query, query = _t === void 0 ? null : _t, onProfileImagePress = _a.onProfileImagePress;
    var HeaderComponent = ListHeaderComponent ?
        ListHeaderComponent : (_jsx(ProfileHeader, { profile: profile, onFollowingPress: onFollowingPress, onFollowersPress: onFollowersPress }));
    return (_jsx(Feed, { ListFooterComponent: ListFooterComponent, feed: feed, signedInUser: signedInUser, onCollectPress: onCollectPress, onCommentPress: onCommentPress, onMirrorPress: onMirrorPress, onLikePress: onLikePress, hideLikes: hideLikes, hideComments: hideComments, hideMirrors: hideMirrors, hideCollects: hideCollects, infiniteScroll: infiniteScroll, onEndReachedThreshold: onEndReachedThreshold, ListHeaderComponent: HeaderComponent, onProfileImagePress: onProfileImagePress, query: query ? query : {
            name: "getPublications",
            profileId: profile.id,
            publicationTypes: ["POST", "MIRROR"]
        } }));
}
//# sourceMappingURL=Profile.js.map