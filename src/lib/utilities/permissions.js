import _ from 'underscore';
import Config from '../permissionDefinitions';
import Auth from './Auth';

export default class permissions {

	static hasPermission(permission) {
		return this.permissionValidator(permission);
	}

	static allowArmyFeederAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.ARMY_FEEDER_ADMIN);
	}

	static allowArmyRecon() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_VIEW_ARMY_RECON);
	}

	static allowDFASFeederAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.DFAS_FEEDER_ADMIN);
	}

	static allowNWBEditGlobal() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_NAVY_WB_GLOBAL)
	}

	static allowNWBApplyTickmarks() {
		return this.permissionValidator(Config.PERMISSIONS.APPLY_NAVY_WB_TICKMARKS)
	}

	static allowEditCMS(page) {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_CMS + page);
	}

	static allowViewDataRequestDSTUpdateToggle() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATA_REQUEST_DST_TOGGLE)
	}

	static allowViewAuditEDLHistory() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_EDL_HISTORY)
	}

	static allowEditMagellanDataStatusTracker() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_MAGELLAN_DST);
	}

	static allowDataCatalog() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATA_CATALOG);
	}

	static allowSemanticSearch() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_SEMANTIC_SEARCH);
	}

	static allowViewCDS() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_VIEW_CDS_WORKFLOW);
	}

	static allowViewDataMil(){
		return this.permissionValidator(Config.PERMISSIONS.CAN_VIEW_DATA_MIL);
	}

	static allowViewKpis() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_KPIS);
	}

	static allowViewDSTBirdsEye() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DST_BIRDS_EYE);
	}

	static allowViewTickmarksLibrary() {
		return this.allowViewOSDTickmark() || this.allowViewNavyTickmark() || this.allowAnyTickmarkCreation();
	}

	static allowViewOSDTickmark() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_TICKMARKS);
	}

	static allowViewNavyTickmark() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_NAVY_TICKMARKS)
	}

	static allowAnyTickmarkCreation() {
		return this.allowOSDTickmarkCreation() || this.allowNavyTickmarkCreation();
	}

	static allowOSDTickmarkCreation() {
		return this.permissionValidator(Config.PERMISSIONS.ADMINISTER_OSD_TICKMARKS);
	}

	static allowNavyTickmarkCreation() {
		return this.permissionValidator(Config.PERMISSIONS.ADMINISTER_NAVY_TICKMARKS);
	}


	static allowTickmarkRulesCreation() {
		return this.permissionValidator(Config.PERMISSIONS.CREATE_TICKMARK_RULES);
	}

	static allowViewDatasetManagement() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATASET_MANAGEMENT);
	}

	static allowHaistack() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_HAISTACK);
	}

	static allowGCClone(cloneName) {
		return this.permissionValidator(`View ${cloneName}`);
	}

	static allowEditImpalaDescribeExtendedBlacklist() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_IMPALA_DESCRIBE_EXTENDED_BLACKLIST);
	}

	static allowEditImpalaCsvExportLimit() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_IMPALA_CSV_EXPORT_LIMIT);
	}

	static allowEditDatasetManagement(db, table) {
		if (db && table) return this.permissionValidator(Config.PERMISSIONS.EDIT_DATASET_MANAGEMENT.replace('#TABLE', `${db}.${table}`));
		const regex = /\b(\w*Edit Dataset Management\w*)\b/;
		return this.regexPermissionValidator(regex);
	}

	static allowApproveDatasetManagement(db, table) {
		if (db && table) return this.permissionValidator(Config.PERMISSIONS.APPROVE_DATASET_MANAGEMENT.replace('#TABLE', `${db}.${table}`));
		const regex = /\b(\w*Approve Dataset Management\w*)\b/;
		return this.regexPermissionValidator(regex);
	}

	static allowDashboard() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DASHBOARD);
	}

	static allowEDADocuments() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_EDA_DOCUMENTS);
	}

	static allowVariance() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_VARIANCE);
	}

	static allowVarianceAnalytics() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_VARIANCE_ANALYTICS);
	}

	static allowBucketingCreateTicket() {
		return this.permissionValidator(Config.PERMISSIONS.BUCKETING_CREATE_TICKET);
	}

	static allowImproperPayCreateTicket() {
		return this.permissionValidator(Config.PERMISSIONS.IMPROPER_PAY_CREATE_TICKET);
	}

	static allowImproperPayManagerPermissions() {
		return this.permissionValidator(Config.PERMISSIONS.IMPROPER_PAY_MANAGER);
	}

	static allowUserManagement() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_USER_MANAGEMENT, false);
	}

	static allowUserRoleExport() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_USER_ROLE_EXPORT);
	}

	static allowMegamenuEdit(){
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_MEGAMENU_EDIT);
	}

	static allowJoinsManagement() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_MANAGE_JOIN_PERMISSIONS, false);
	}

	static allowUserMetrics() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_USER_METRICS);
	}

	static allowFSD() {
		return this.permissionValidator(Config.PERMISSIONS.FSD_ADMIN) ||
		this.permissionValidator(Config.PERMISSIONS.FSD_VO) ||
		this.permissionValidator(Config.PERMISSIONS.FSD_PREP) ||
		this.permissionValidator(Config.PERMISSIONS.FSD_DFAS_A) ||
		this.permissionValidator(Config.PERMISSIONS.FSD_ENT_A);
	}

	static allowDataportal() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATAPORTAL);
	}

	static allowFileshare() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_FILESHARE);
	}

	static allowQlik() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_QLIK);
	}

	static allowDARQ() {
		let regEx = RegExp(Config.PERMISSIONS.VIEW_DARQ);
		return this.regexPermissionValidator(regEx);
	}

	static allowFBWT() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_FBWT);
	}

	static allowFilebrowser() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_HDFS_ROOT) || this.permissionValidator(Config.PERMISSIONS.VIEW_HDFS_RECONS) || this.permissionValidator(Config.PERMISSIONS.VIEW_HDFS_GLOBAL_SHARE) || this.permissionValidator(Config.PERMISSIONS.VIEW_DATA_ZONE_RESTRICTED_FILES);
	}

	static allowImproperPay() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_IMPROPER_PAY);
	}

	static allowDatabaseQuery() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATABASE_QUERY);
	}

	static allowGuidedDatabaseQuery() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_GUIDED_DATABASE_QUERY);
	}

	static allowTrifacta() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_TRIFACTA);
	}

	static allowStreamSets() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_STREAMSETS);
	}

	static allowNFR() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_NFR);
	}

	static allowViewEntity(routeProps) {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_SINGLE_ENTITY + " " + routeProps.match.params.entityname);
	}

	static allowViewNavy() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_NAVY_DATA);
	}

	static allowViewAll() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_ALL_AGENCIES);
	}

	static allowViewAllSubEntities() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_ALL_SUB_ENTITIES);
	}

	static allowViewUploadStatusTracker() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_UPDATE_STATUS_TRACKER);
	}

	static allowEditEDLConfig() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_EDL_CONFIG);
	}

	static allowDeleteAWB() {
		return this.permissionValidator(Config.PERMISSIONS.DELETE_AWB);
	}

	static allowAWBPublish() {
		return this.permissionValidator(Config.PERMISSIONS.PUBLISH_AWB);
	}

	static allowBulkGenerateWorkbooks() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_BULK_GENERATE);
	}

	static allowNWBPublish() {
		return this.permissionValidator(Config.PERMISSIONS.PUBLISH_NAVY_WB);
	}

	static allowTickmarkImport() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_IMPORT_TICKMARKS);
	}

	static allowReconManagementCreate() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_CREATE_DATASET);
	}

	static allowReconManagementPublish() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_PUBLISH_DATASET);
	}

	static allowWorkbookSandboxing() {
		return Auth.getUserSandbox() !== null;
	}

	static allowCreateDatabase() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_CREATE_PREFIXED_IMPALA_DATABASE)
	}

	static allowViewDatabase() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_PREFIXED_IMPALA_DATABASE)
	}

	static allowDropDatabase() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_DROP_PREFIXED_IMPALA_DATABASE_TABLE)
	}

	static isSQLBuilderPowerUser() {
		return this.permissionValidator(Config.PERMISSIONS.SQL_BUILDER_POWER_USER);
	}

	static canExportUnlimited() {
		return this.permissionValidator(Config.PERMISSIONS.CAN_EXPORT_UNLIMITED);
	}

	static isAdministrator() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN);
	}

	static isSuperAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.SUPER_ADMIN);
	}

	static isFSDAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.FSD_ADMIN);
	}

	static isDARQOwner() {
		return this.permissionValidator('DARQ' + Config.PERMISSIONS.OWNER);
	}

	static isDARQOSD() {
		return this.permissionValidator('DARQ' + Config.PERMISSIONS.OSD);
	}

	static allowDARQSelfAssign() {
		return this.permissionValidator(Config.PERMISSIONS.WORKFLOW_SELF_ASSIGN);
	}

	static allowCatalogRefresh() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_REFRESH_DATA_CATALOG);
	}

	static allowCacheClear() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_CLEAR_CACHE);
	}

	static allowExportFeederTickets() {
		return this.permissionValidator(Config.PERMISSIONS.BUCKETING_EXPORT_TICKETS);
	}

	static allowAnalysisCacheReload() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_ANALYSIS_RELOAD_CACHE);
	}

	static allowSQLBuilderCacheClear() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_SQL_BUILDER_RELOAD_CACHE);
	}

	static allowNavyWorkbookSummaryCacheReload() {
		return this.permissionValidator(Config.PERMISSIONS.ADMIN_NAVY_WORKBOOK_SUMMARY_RELOAD_CACHE);
	}

	static allowMdm() {
		return (this.allowViewDatasetManagement() || this.allowEditDatasetManagement() || this.allowApproveDatasetManagement());
	}

	static allowEditMdmEmailRecipients() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_MDM_EMAIL_RECIPIENTS);
	}

	static allowEditMdmHiddenTables() {
		return this.permissionValidator(Config.PERMISSIONS.EDIT_MDM_HIDDEN_TABLES);
	}

	static canViewAgency(agency) {
		return this.permissionValidator(`${Config.PERMISSIONS.VIEW_SINGLE_ENTITY} ${agency}`);
	}

	static isOSDAnalyst() {
		return this.permissionValidator(Config.PERMISSIONS.OSD_ANALYST);
	}

	static isReleaseNotesAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.RELEASE_NOTES_ADMIN);
	}

	static allowFileContentSearch() {
		return this.permissionValidator(Config.PERMISSIONS.ALLOW_FILE_CONTENT_SEARCH);
	}

	static getWorkflowRoles(agency, prefix) {
		return {
			isOwner: this.permissionValidator(prefix + Config.PERMISSIONS.OWNER),
			isOSD: this.permissionValidator(prefix + Config.PERMISSIONS.OSD),
			isHQ: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_HQ).replace('#agency', agency)),
			isCoordinator1: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_COORDINATOR + ' 1').replace('#agency', agency)),
			isCoordinator2: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_COORDINATOR + ' 2').replace('#agency', agency)),
			isCoordinator3: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_COORDINATOR + ' 3').replace('#agency', agency)),
			isReviewer1: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_REVIEWER + ' 1').replace('#agency', agency)),
			isReviewer2: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_REVIEWER + ' 2').replace('#agency', agency)),
			isReviewer3: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_REVIEWER + ' 3').replace('#agency', agency)),
			isReviewer4: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_REVIEWER + ' 4').replace('#agency', agency)),
			isReviewer5: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_REVIEWER + ' 5').replace('#agency', agency)),
			isTester: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_TESTER).replace('#agency', agency)),
			isViewOnly: this.permissionValidator((prefix + Config.PERMISSIONS.WORKFLOW_VIEW_ONLY).replace('#agency', agency)),
			isAdmin: this.permissionValidator(prefix + Config.PERMISSIONS.WORKFLOW_ADMIN.replace('#agency', agency)),
			isUserAdmin: this.permissionValidator(prefix + Config.PERMISSIONS.WORKFLOW_USER_ADMIN.replace('#agency', agency)),
			isGroupAdmin: this.permissionValidator(prefix + Config.PERMISSIONS.WORKFLOW_GROUP_ADMIN.replace('#agency', agency)),
		};
	}

	static getAllowedAgencies() {
		let allowedEntities = new Set();
		for (let permission of Auth.getUserPermissions()) {
			let matchedEntity = permission.match(/View Agency (.*)/);
			if (matchedEntity && matchedEntity[1] !== 'ALL') {
				let entity = matchedEntity[1];
				allowedEntities.add(entity);
				allowedEntities.add(entity.toLowerCase());
				allowedEntities.add(entity.toUpperCase());
				allowedEntities.add(entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase());
			}
		}
		return Array.from(allowedEntities).sort();
	}

	static isDARQUpperManagement() {
		//upper management implies coordinator/hq

		var permissions = Auth.getUserPermissions();
		if (permissions && !Auth.userDisabled()) {
			for (var permission of permissions) {
				let upperCasedPerm = permission.toUpperCase();
				if ((upperCasedPerm.includes('DARQ') && (upperCasedPerm.includes('COORDINATOR') || upperCasedPerm.includes('HQ'))) || upperCasedPerm === Config.WORKFLOW_OWNER)
					return true;
			}
		}
		return false;
	}

	static isDARQAgencyAdmin() {
		return this.isDARQAdmin() || this.isDARQUserAdmin() || this.isDARQGroupAdmin()
	}

	static isDARQAdmin(agency = null) {
		return this.isDARQOwner() ||
			this.regexPermissionValidator(Config.PERMISSIONS.DARQ_ADMIN(agency));
	}

	static isDARQUserAdmin(agency = null) {
		return this.isDARQOwner() ||
			this.regexPermissionValidator(Config.PERMISSIONS.DARQ_USER_ADMIN(agency));
	}

	static isDARQGroupAdmin(agency = null) {
		return this.isDARQOwner() ||
			this.regexPermissionValidator(Config.PERMISSIONS.DARQ_GROUP_ADMIN(agency));
	}


	static isDARQCoordinator(agency = null, level = 1) {
		return this.permissionValidator((`DARQ${Config.PERMISSIONS.WORKFLOW_COORDINATOR} ${level}`).replace('#agency', agency));
	}

	static getAllowedDarqAdminAgencies() {
		let agencies = [];

		if (this.isDARQOwner() || this.isDARQOSD()) {
			return Config.DARQ_AGENCIES;
		} else {
			for (let agency of Config.DARQ_AGENCIES) {
				if (
					this.permissionValidator(`DARQ ${agency.value} Admin`) ||
					this.permissionValidator(`DARQ ${agency.value} User Admin`) ||
					this.permissionValidator(`DARQ ${agency.value} Group Admin`)
				)
					agencies.push(agency)
			}
		}

		return agencies;
	}

	static isGameChangerAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.GAMECHANGER_ADMIN);
	}

	static isDataRequestAdmin() {
		return this.permissionValidator(Config.PERMISSIONS.DATA_REQUEST_ADMIN);
	}

	static canViewDataZoneRestrictedFiles() {
		return this.permissionValidator(Config.PERMISSIONS.VIEW_DATA_ZONE_RESTRICTED_FILES);
	}

	static canUploadPiiPhiData() {
		return this.permissionValidator(Config.PERMISSIONS.EDL_UPLOAD_PII_PHI_DATA);
	}

	static canUploadSensitiveData() {
		return this.permissionValidator(Config.PERMISSIONS.EDL_UPLOAD_SENSITIVE_DATA);
	}

	static permissionValidator(desiredPermission, includeUnSuperAdmin = true) {
		if (!desiredPermission) {
			console.warn("PermissionValidator: No permission passed")
			return false
		}
		var permissions = Auth.getUserPermissions();
		if (permissions && !Auth.userDisabled()) {
			for (var permission of permissions) {
				if (
					permission.toUpperCase() === desiredPermission.toUpperCase() ||
					permission.toUpperCase() === Config.PERMISSIONS.SUPER_ADMIN.toUpperCase() ||
					(includeUnSuperAdmin && permission.toUpperCase() === Config.PERMISSIONS.UNSUPER_ADMIN.toUpperCase())
				) {
					return true;
				}
			}
		}
		return false;
	};

	static regexPermissionValidator(desiredRegex) {
		var permissions = Auth.getUserPermissions();
		if (permissions && !Auth.userDisabled()) {
			for (var permission of permissions) {
				if (desiredRegex.test(permission) || permission.toUpperCase() === Config.PERMISSIONS.SUPER_ADMIN.toUpperCase()) {
					return true;
				}
			}
		}
		return false;
	};
};