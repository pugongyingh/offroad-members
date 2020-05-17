const { gql } = require('apollo-server-express');

module.exports.typeDefs = /* graphql */ gql`
  # Scalars
  scalar DateTime

  # Enums
  enum Role {
    ADMIN
    OFFICER
    RUN_MASTER
    RUN_LEADER
    USER
  }

  enum AccountStatus {
    ACTIVE
    PAST_DUE
    DELINQUENT
    REMOVED
    RESIGNED
    INACTIVE
    LIMITED
    LOCKED
  }

  enum AccountType {
    FULL
    ASSOCIATE
    EMERITUS
    GUEST
  }

  enum Office {
    PRESIDENT
    VICE_PRESIDENT
    SECRETARY
    TREASURER
  }

  enum Title {
    WEBMASTER
    CHARTER_MEMBER
    HISTORIAN
  }

  enum Poll {
    ELECTION
    RUN_SELECTION
  }

  enum TrailDifficulty {
    UNKNOWN
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum MigrationStatus {
    NEEDED
    IN_PROGRESS
    COMPLETED
  }

  enum RSVPStatus {
    NONE
    CANT_GO
    GOING
    MAYBE
  }

  enum TrailCondition {
    CLEAR
    MINOR_ISSUES
    MAJOR_ISSUES
    CLOSED
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
    UNDISCLOSED
  }

  enum OutfitLevel {
    MODIFIED
    STOCK
  }

  enum ActivityMessageCode {
    EVENT_ATTENDED
    RUN_LEAD
    EVENT_REVIEW_SUBMITTED
    RUN_REPORT_SUBMITTED
    GALLERY_PHOTO_SUBMITTED
    GALLERY_PHOTOS_SUBMITTED
    PROFILE_PHOTO_SUBMITTED
    RIGBOOK_PHOTO_SUBMITTED
    # COMMENTED
    JOINED
  }

  enum MembershipMessageCode {
    ACCOUNT_CREATED
    ACCOUNT_UNLOCKED
    ACCOUNT_CHANGED
    ACCOUNT_REJECTED
    DUES_PAID
    OFFICE_ADDED
    OFFICE_REMOVED
    TITLE_ADDED
    TITLE_REMOVED
    MEMBERSHIP_ELIGIBLE
    MEMBERSHIP_GRANTED
    GUEST_RESTRICTED
  }

  enum EventType {
    RUN
    COLLECTION
    FUNDRAISING
    MEETING
    CLINIC
    SOCIAL
  }

  enum Tshirt {
    XS
    S
    M
    L
    XL
    XXL
    XXXL
    XXXXL
  }

  # Types
  type SuccessMessage {
    message: String
  }

  type SuccessTime {
    time: DateTime
  }

  type Mutation {
    register(
      firstName: String
      lastName: String
      email: String!
      confirmEmail: String!
      source: String!
    ): SuccessMessage
    signUp(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      username: String!
      gender: Gender!
      birthdate: DateTime!
      token: String!
    ): SuccessMessage!
    unlockNewAccount(username: String!): SuccessMessage!
    login(username: String!, password: String!): SuccessMessage!
    logout: SuccessMessage
    requestReset(email: String!): SuccessMessage
    resetPassword(
      resetToken: String!
      password: String!
      confirmPassword: String!
    ): User!
    changePassword(password: String!, confirmPassword: String!): SuccessMessage
    changeEmail(email: String!): SuccessMessage
    updateRole(role: Role, userId: ID!): User
    updateAccountType(accountType: AccountType, userId: ID!): User
    updateAccountStatus(accountStatus: AccountStatus, userId: ID!): User
    updateOffice(office: Office, userId: ID!): User
    updateTitle(title: Title, userId: ID!): User
    createEvent(event: UpsertEventInput!): SuccessMessage
    updateEvent(id: ID!, event: UpsertEventInput!): SuccessMessage
    setRSVP(rsvp: RSVPInput): SuccessMessage
    sendMessage(
      to: [String!]!
      subject: String
      htmlText: String!
    ): SuccessMessage
    updateUserProfileSettings(data: UserUpdateInput!, id: ID!): SuccessMessage
    updateUserAdminProfileSettings(
      data: UserAdminUpdateInput!
      id: ID!
    ): SuccessMessage
    updateAvatar(data: ImageUpdateInput!): SuccessMessage
    deleteAvatar(avatar: CloudinaryImageInput!): SuccessMessage
    updateRig(data: ImageUpdateInput!): SuccessMessage
    deleteRig(rig: CloudinaryImageInput!): SuccessMessage
    updateVehicle(id: ID, vehicle: VehicleInput!): SuccessMessage
    submitElection(election: ElectionInput!): Election
    submitVote(vote: VoteInput): SuccessMessage
    createTrail(trail: TrailInput): SuccessMessage
    updateTrail(trail: TrailInput!, id: ID!): SuccessMessage
  }

  type Query {
    myself: User
    users(
      role: [Role]
      accountStatus: [AccountStatus]
      accountType: [AccountType]
      title: [Title]
      office: [Office]
      orderBy: [String]
    ): [User]!
    user(username: String): User!
    getRegistration(token: String): User
    getDuesLastReceived(username: String!): SuccessTime
    getOfficer(office: Office!): User!
    getMembers(accountTypes: [AccountType]): [User]!
    getRunLeaders: [User]!
    getMessageRecipients: [User]!
    getUpcomingEvents(count: Int): [Event]!
    # getMyUpcomingEvents: [Event]!
    getUserEvents(username: String!, eventType: EventType): [Event]!
    getPastEvents: [Event]!
    getEvent(eventId: ID!): Event!
    getNextEvent: Event
    # getMyNextEvent: Event
    getTrails: [Trail]!
    getTrail(slug: String!): Trail
    electionCandidates(
      accountType: AccountType!
      accountStatus: AccountStatus!
    ): [User]!
    getActiveElections: [Election]!
    getActiveElectionsWithResults: [Election]!
    getElection(id: ID!): Election!
    getUserVote(ballot: ID): [Vote]!
    getElections(startTime: DateTime, endTime: DateTime): [Election]!
    getMembershipLogItems(
      username: String!
      messageCode: MembershipMessageCode!
    ): [MembershipLogItem]!
    # adminStats: AdminStats
    # activeMembersPerYear: MemberCount
    # guestsWithLockedAccounts: [User]!
    # guestsAskedToJoin: [User]!
    # guestsEligibleForMembership: [User]!
  }

  type Registration {
    id: ID
    createdAt: DateTime!
    # ipAddress: String!
    firstName: String
    lastName: String
    email: String!
    source: String!
    token: String!
    tokenExpiry: DateTime!
  }

  type User {
    id: ID
    createdAt: DateTime!
    joined: DateTime
    lastLogin: DateTime
    firstName: String
    lastName: String
    email: String
    gender: Gender
    birthdate: DateTime
    username: String
    street: String
    city: String
    state: String
    zip: String
    phone: String!
    emergencyContactName: String
    emergencyContactPhone: String
    photoPermissions: Boolean
    showPhoneNumber: Boolean
    firstLoginComplete: Boolean
    accountSetupComplete: Boolean
    oldSitemigrationComplete: Boolean
    avatar: CloudinaryImage
    isCharterMember: Boolean!
    titles: [Title]
    role: Role!
    accountStatus: AccountStatus
    accountType: AccountType
    office: Office
    # vehicles: [Vehicle]
    vehicle: Vehicle
    comfortLevel: String
    tshirtSize: Tshirt
    activityLog: [ActivityLogItem]
    membershipLog: [MembershipLogItem]
    eventsRSVPd: [RSVP]
    eventsLead: [Event]
    trailsVisited: [Trail]
    bandaids: [Bandaid]
    runReportsLogged: [RunReport]
  }

  type ActivityLogItem {
    id: ID!
    time: DateTime!
    message: String!
    messageCode: ActivityMessageCode!
    user: User!
    link: String
  }

  type MembershipLogItem {
    id: ID!
    time: DateTime!
    message: String!
    messageCode: MembershipMessageCode!
    user: User!
    logger: User
  }

  type Event {
    id: ID!
    type: EventType!
    title: String!
    creator: User!
    description: String
    featuredImage: CloudinaryImage
    startTime: DateTime
    endTime: DateTime
    host: User
    rsvps: [RSVP]
    address: String
    trailDifficulty: TrailDifficulty
    trailNotes: String
    rallyAddress: String
    rallyTime: DateTime
    membersOnly: Boolean
    trail: Trail
    bandaids: [Bandaid]
    runReports: [RunReport]
  }

  type RSVP {
    member: User!
    event: Event!
    status: RSVPStatus!
  }

  type Trail {
    id: ID!
    slug: String!
    name: String
    description: String
    featuredImage: CloudinaryImage
    trailheadCoords: String
    # coords: Coords
    address: String
    avgDifficulty: TrailDifficulty
    avgRatings: Float
    currentConditions: String
    conditionsLastReported: DateTime
    favoriteCount: Int
    pastEvents: [Event]
    visitors: [User]
  }

  type RunReport {
    id: ID!
    startTime: DateTime
    endTime: DateTime
    reportFiled: DateTime
    reporter: User
    title: String
    description: String
    trail: Trail
    event: Event
    weather: String
    difficulty: TrailDifficulty
    rating: Float
    conditions: TrailCondition
    conditionsNotes: String
    favorite: Boolean
  }

  type Bandaid {
    id: ID!
    occurred: DateTime
    event: Event
    memberInvolved: User
    title: String
    description: String
  }

  type Result {
    candidate: User
    count: Int!
  }

  type CloudinaryImage {
    id: ID!
    # createdAt: DateTime!
    # updatedAt: DateTime!
    publicId: String!
    url: String
    smallUrl: String
  }

  type AdminStats {
    activeFullMembers: Int
    pastDueFullMembers: Int
    delinquentFullMembers: Int
    removedFullMembers: Int
    resignedFullMembers: Int
    inactiveFullMembers: Int
    limitedGuestMembers: Int
    lockedGuestMembers: Int

    emeritusMembers: Int
    deceasedMembers: Int
    associateMembers: Int
    guestMembers: Int
    charterMembers: Int

    fullMembersLastYear: Int
    newFullMembersThisYear: Int
    neededForQuorum: Int
    neededToPassMotion: Int
    neededToVoteOnNewMember: Int
    newFullMembersAllowed: Int
    fullMembersAllowed: Int
  }

  type MemberCount {
    year: Int
    count: Int
  }

  type Election {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    electionName: String!
    startTime: DateTime
    endTime: DateTime
    races: [Ballot]
  }

  type Ballot {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    description: String
    candidates: [User]
    votes: [Vote]
    results: [Result]
  }

  type Vote {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    ballot: Ballot!
    candidate: User
    voter: User!
  }

  # type Preference {
  #   id: ID!
  #   createdAt: DateTime
  #   updatedAt: DateTime!
  #   user: User
  #   emergencyContactName: String
  #   emergencyContactPhone: String
  #   photoPermissions: Boolean
  #   showPhoneNumber: Boolean
  # }

  # type UserMeta {
  #   id: ID!
  #   createdAt: DateTime
  #   updatedAt: DateTime!
  #   user: User
  #   emailVerified: Boolean
  #   firstLoginComplete: Boolean
  #   accountSetupComplete: Boolean
  #   oldSitemigrationComplete: Boolean
  # }

  type Vehicle {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    year: Int!
    make: String!
    model: String!
    name: String
    trim: String
    image: CloudinaryImage
    outfitLevel: OutfitLevel
    mods: [String]
  }

  # type Condition {
  #   id: ID!
  #   createdAt: DateTime!
  #   updatedAt: DateTime!
  #   report: RunReport!
  #   status: TrailCondition!
  #   notes: String
  # }

  # type ContactInfo {
  #   id: ID!
  #   createdAt: DateTime
  #   updatedAt: DateTime!
  #   user: User
  #   street: String
  #   city: String
  #   state: String
  #   zip: String
  #   phone: String!
  # }

  # Form Inputs
  input RSVPInput {
    userId: ID
    eventId: ID
    status: RSVPStatus
  }

  input UserUpdateInput {
    firstName: String!
    lastName: String!
    username: String!
    gender: String!
    birthdate: DateTime!
    joined: DateTime
    contactInfoId: ID
    street: String!
    city: String!
    state: String!
    zip: String!
    phone: String!
    avatar: CloudinaryImageInput
    preferencesId: ID
    emergencyContactName: String!
    emergencyContactPhone: String!
  }

  input UserAdminUpdateInput {
    id: String
    title: String
    isCharterMember: Boolean!
    office: String
    role: String!
    accountStatus: String!
    accountType: String!
  }

  input UpsertEventInput {
    type: String!
    title: String!
    description: String
    startTime: DateTime!
    endTime: DateTime!
    address: String
    trailDifficulty: TrailDifficulty
    trailNotes: String
    rallyAddress: String
    rallyTime: DateTime
    membersOnly: Boolean
    host: String!
    trail: String
    featuredImage: String
    newFeaturedImage: CloudinaryImageInput
  }

  input ElectionInput {
    electionName: String!
    startTime: String!
    endTime: String!
    races: [BallotInput!]!
  }

  input BallotInput {
    id: String
    title: String!
    desc: String
    candidates: [UserInput!]!
    # votes: [Vote]
  }

  input UserInput {
    id: ID!
  }

  input VoteInput {
    ballot: ID!
    dateTime: DateTime!
    candidate: ID
  }

  input ImageUpdateInput {
    old: CloudinaryImageInput
    new: CloudinaryImageInput!
  }

  input CloudinaryImageInput {
    id: ID
    publicId: String!
    url: String!
    smallUrl: String
  }

  input TrailInput {
    name: String!
    slug: String!
    description: String
    featuredImage: String
    newFeaturedImage: CloudinaryImageInput
    trailheadCoords: String
    address: String
  }

  input VehicleInput {
    year: Int
    make: String
    model: String
    trim: String
    name: String
    outfitLevel: OutfitLevel
    mods: [String]
  }
`;
